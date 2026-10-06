#!/usr/bin/env python3
"""Generate episode voice audio with Kokoro and mouth cues with Rhubarb.

Usage:
    python tools/make_voice.py episodes/<name>.voice.json

Input (voice spec JSON): duration, voices{speaker: {voice, speed, pitch}}, lines[{id, speaker, start, text}].
Output (all under out/voice/<name>/):
    <id>.wav            one WAV per line (24 kHz, 16-bit mono)
    mix.wav             all lines placed on the timeline, padded to `duration`
    report.json         timing report (line durations, overlaps, overruns, levels)
and episodes/<name>.mouth.json: merged Rhubarb mouth cues, only for speakers with "onscreen": true
(default: the speaker called "coconut").

Requirements: pip install -r requirements.txt, Rhubarb Lip Sync binary (env RHUBARB or in PATH),
Kokoro model files in ./models (downloaded automatically if missing), ffmpeg (ffmpeg-static from node_modules or PATH).
"""
import json
import math
import os
import shutil
import subprocess
import sys
import tempfile
import urllib.request
from pathlib import Path

import numpy as np
import soundfile as sf

ROOT = Path(__file__).resolve().parent.parent
MODELS = Path(os.environ.get("KOKORO_MODEL_DIR", ROOT / "models"))
MODEL_URL = "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/"
SR = 24000


def find_ffmpeg():
    cand = list((ROOT / "node_modules" / "ffmpeg-static").glob("ffmpeg*"))
    cand = [c for c in cand if c.is_file() and os.access(c, os.X_OK)]
    return str(cand[0]) if cand else (shutil.which("ffmpeg") or sys.exit("ffmpeg not found"))


def find_rhubarb():
    env = os.environ.get("RHUBARB")
    if env and Path(env).exists():
        return env
    return shutil.which("rhubarb") or sys.exit("Rhubarb not found: set RHUBARB=/path/to/rhubarb or add it to PATH")


def ensure_models():
    MODELS.mkdir(parents=True, exist_ok=True)
    for name in ("kokoro-v1.0.onnx", "voices-v1.0.bin"):
        target = MODELS / name
        if not target.exists():
            print(f"downloading {name} ...")
            urllib.request.urlretrieve(MODEL_URL + name, target)
    return str(MODELS / "kokoro-v1.0.onnx"), str(MODELS / "voices-v1.0.bin")


def pitch_shift(samples, semitones, ffmpeg):
    """Raise/lower pitch without changing tempo (asetrate + atempo)."""
    if not semitones:
        return samples
    r = 2 ** (semitones / 12)
    with tempfile.TemporaryDirectory() as tmp:
        a, b = Path(tmp) / "in.wav", Path(tmp) / "out.wav"
        sf.write(a, samples, SR, subtype="PCM_16")
        flt = f"asetrate={SR * r:.0f},aresample={SR},atempo={1 / r:.6f}"
        subprocess.run([ffmpeg, "-loglevel", "error", "-y", "-i", str(a), "-af", flt, str(b)], check=True)
        out, _ = sf.read(b, dtype="float32")
    return out


def rms_db(x):
    r = float(np.sqrt(np.mean(np.square(x)))) if len(x) else 0.0
    return -120.0 if r <= 1e-9 else 20 * math.log10(r)


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    spec_path = Path(sys.argv[1]).resolve()
    name = spec_path.name.replace(".voice.json", "")
    spec = json.loads(spec_path.read_text())
    out_dir = ROOT / "out" / "voice" / name
    out_dir.mkdir(parents=True, exist_ok=True)

    from kokoro_onnx import Kokoro
    model, voices = ensure_models()
    kokoro = Kokoro(model, voices)
    ffmpeg = find_ffmpeg()
    rhubarb = find_rhubarb()

    total = int(spec["duration"] * SR)
    mix = np.zeros(total, dtype=np.float32)
    report = {"duration": spec["duration"], "lines": [], "problems": []}
    mouth_cues = []

    lines = sorted(spec["lines"], key=lambda l: l["start"])
    prev_end = 0.0
    for line in lines:
        v = spec["voices"][line["speaker"]]
        samples, sr = kokoro.create(line["text"], voice=v["voice"], speed=v.get("speed", 1.0), lang="en-us")
        assert sr == SR, f"unexpected sample rate {sr}"
        samples = pitch_shift(np.asarray(samples, dtype=np.float32), v.get("pitch", 0), ffmpeg)
        # consistent loudness: normalize each line to a target RMS, but never let the peak exceed -1 dBFS
        target_rms = 10 ** (spec.get("rms_target_db", -17.0) / 20)
        cur_rms = float(np.sqrt(np.mean(np.square(samples)))) or 1e-9
        gain = target_rms / cur_rms
        peak = float(np.max(np.abs(samples))) or 1.0
        gain = min(gain, 0.89 / peak)
        samples = samples * gain
        path = out_dir / f"{line['id']}.wav"
        sf.write(path, samples, SR, subtype="PCM_16")

        dur = len(samples) / SR
        start = line["start"]
        end = start + dur
        info = {"id": line["id"], "speaker": line["speaker"], "start": start, "end": round(end, 2),
                "duration": round(dur, 2), "rms_db": round(rms_db(samples), 1), "text": line["text"]}
        if end > spec["duration"]:
            report["problems"].append(f"{line['id']} ends at {end:.2f}s after episode end {spec['duration']}s")
        if start < prev_end:
            report["problems"].append(f"{line['id']} starts at {start:.2f}s before previous line ends at {prev_end:.2f}s (overlap)")
        prev_end = max(prev_end, end)
        i0 = int(start * SR)
        seg = samples[: max(0, total - i0)]
        mix[i0:i0 + len(seg)] += seg
        report["lines"].append(info)

        # mouth cues for on-screen speakers
        if v.get("onscreen", line["speaker"] == "coconut"):
            txt = Path(tempfile.mkstemp(suffix=".txt")[1])
            txt.write_text(line["text"])
            res = subprocess.run([rhubarb, "-f", "json", "-q", "--dialogFile", str(txt), str(path)],
                                 capture_output=True, text=True)
            txt.unlink()
            if res.returncode != 0:
                report["problems"].append(f"rhubarb failed for {line['id']}: {res.stderr.strip()[:200]}")
                continue
            for c in json.loads(res.stdout)["mouthCues"]:
                mouth_cues.append({"start": round(start + c["start"], 3), "end": round(start + c["end"], 3), "value": c["value"]})

    mix_peak = float(np.max(np.abs(mix)))
    if mix_peak > 0.99:
        mix *= 0.99 / mix_peak
        report["problems"].append("mix clipped, normalized")
    sf.write(out_dir / "mix.wav", mix, SR, subtype="PCM_16")

    # fill gaps with X (idle mouth) so the renderer always has a value
    mouth_cues.sort(key=lambda c: c["start"])
    filled, t = [], 0.0
    for c in mouth_cues:
        if c["start"] > t + 1e-3:
            filled.append({"start": round(t, 3), "end": c["start"], "value": "X"})
        filled.append(c)
        t = c["end"]
    if t < spec["duration"]:
        filled.append({"start": round(t, 3), "end": spec["duration"], "value": "X"})
    mouth_path = spec_path.parent / f"{name}.mouth.json"
    mouth_path.write_text(json.dumps({"metadata": {"generatedBy": "tools/make_voice.py"}, "mouthCues": filled}, indent=1))

    report["mix_peak_db"] = round(20 * math.log10(max(mix_peak, 1e-9)), 1)
    report["mouth_shapes"] = {s: sum(1 for c in mouth_cues if c["value"] == s) for s in sorted({c["value"] for c in mouth_cues})}
    (out_dir / "report.json").write_text(json.dumps(report, indent=2))
    print(json.dumps(report, indent=2))
    print(f"\nmix:   {out_dir / 'mix.wav'}\nmouth: {mouth_path}")


if __name__ == "__main__":
    main()
