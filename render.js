#!/usr/bin/env node
// Usage:
//   node render.js episodes/ep.json [--out out/name.mp4]     render the full episode to MP4
//   node render.js episodes/ep.json --stills 3,12.5,40       only write PNG stills (no video) for checking
// Renders an episode (JSON timeline) using only the shared Coconut character.
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { chromium } = require('playwright');
const { coconutSVG } = require('./character/coconut');
const { backgrounds, foregrounds, bubbleSVG, captionSVG, heartsSVG } = require('./scenes/room');

// Every animatable track and its default value. Tracks are [[time, value], ...] keyframes in the episode JSON.
const DEFAULTS = {
  offsetX: 0, offsetY: 0, squashX: 1, squashY: 1,
  tilt: 0, headBob: 0, lookX: 0, lookY: 0,
  earAngle: 0, earL: 0, earR: 0,
  eyeWide: 0, grumpy: 1, eyesClosed: 0,
  tailAmp: 12, tailSpeed: 2.4,
  pawL: 0, pawR: 0, wave: 0, bell: 0,
  nuzzle: 0, purr: 0, hearts: 0,
  zoom: 1, camX: 0, camY: 0,
  doorOpen: 0, visitorX: 0, visitorWave: 0, visitorWalk: 0
};

const smooth = x => { x = Math.min(1, Math.max(0, x)); return x * x * (3 - 2 * x); };
const hash = n => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

// keyframes: [[t, value], ...] sorted by t; smooth easing between keys
function sample(track, t, fallback) {
  if (!track || !track.length) return fallback;
  if (t <= track[0][0]) return track[0][1];
  for (let i = 1; i < track.length; i++) {
    const [t0, v0] = track[i - 1], [t1, v1] = track[i];
    if (t <= t1) return v0 + (v1 - v0) * smooth((t - t0) / (t1 - t0));
  }
  return track[track.length - 1][1];
}

// fade in/out timed items: [{text,start,end}]
function activeText(items = [], t, fade = 0.15) {
  for (const it of items) {
    if (t >= it.start && t < it.end) {
      const o = Math.min(smooth((t - it.start) / fade), 1 - smooth((t - (it.end - fade)) / fade));
      return [it.text, Math.max(0, Math.min(1, o))];
    }
  }
  return ['', 0];
}

function blinkAt(t, times) {
  let b = 0;
  for (const c of times) {
    const d = Math.abs(t - c);
    if (d < 0.09) b = Math.max(b, 1 - d / 0.09);
  }
  return b;
}

function mouthAt(ep, cues, t) {
  if (cues) for (const c of cues.mouthCues) if (t >= c.start && t < c.end) return c.value;
  if (ep.mouthKeys) for (const k of ep.mouthKeys) if (t >= k.start && t < k.end) return k.shape;
  return 'X';
}

// small deterministic ear twitch that happens every few seconds (life even when idle)
function twitch(t, seed) {
  const period = 2.7;
  const slot = Math.floor(t / period);
  const start = slot * period + hash(slot + seed) * 2.0;
  const d = t - start;
  if (d < 0 || d > 0.25 || hash(slot + seed * 3) < 0.45) return 0;
  return Math.sin((d / 0.25) * Math.PI) * 14;
}

function ensureFfmpeg() {
  try { return require('ffmpeg-static'); } catch (_) { return 'ffmpeg'; }
}

function frameState(ep, tracks, cues, blinkTimes, t, tailPhase) {
  const v = name => sample(tracks[name], t, DEFAULTS[name]);
  const nz = v('nuzzle');
  const nuzzleWave = Math.sin(t * 2.4);
  const params = {
    offsetX: v('offsetX'), offsetY: v('offsetY'),
    squashX: v('squashX'), squashY: v('squashY'),
    // idle life: slow head sway, breathing, eye drift, ear twitches, purr vibration
    tilt: v('tilt') + Math.sin(t * 0.7) * 1.5 + Math.sin(t * 1.9) * 0.5 + nz * nuzzleWave,
    headBob: v('headBob') + Math.sin(t * 1.1) * 1.5 + nz * 0.5 * Math.sin(t * 2.4 + 1),
    lookX: Math.max(-1, Math.min(1, v('lookX') + 0.1 * Math.sin(t * 0.8) + 0.06 * Math.sin(t * 2.3))),
    lookY: v('lookY') + 0.08 * Math.sin(t * 0.6),
    earAngle: v('earAngle'),
    earL: v('earL') + twitch(t, 1),
    earR: v('earR') - twitch(t, 7),
    eyeWide: v('eyeWide'), grumpy: v('grumpy'),
    blink: blinkAt(t, blinkTimes), eyesClosed: v('eyesClosed'),
    tailAngle: Math.sin(tailPhase) * v('tailAmp') - 4,
    tailTip: Math.sin(tailPhase - 0.9) * v('tailAmp') * 1.1,
    breath: 1 + 0.012 * Math.sin(t * 2.2) + v('purr') * 0.012 * Math.sin(t * 72),
    mouth: mouthAt(ep, cues, t),
    pawL: v('pawL'), pawR: v('pawR'), pawWave: v('wave') * 28 * Math.sin(t * 10),
    bell: v('bell') + Math.sin(tailPhase * 1.3) * 3 + v('lookX') * 5 + nz * nuzzleWave * 0.5
  };
  const scene = {
    t, doorOpen: v('doorOpen'), visitorX: v('visitorX'),
    visitorWave: v('visitorWave'), visitorWalk: v('visitorWalk')
  };
  const camera = { zoom: v('zoom'), x: v('camX'), y: v('camY') };
  return { params, scene, camera, hearts: v('hearts') };
}

function frameSVG(ep, bg, fg, st, t) {
  const bgSVG = typeof bg === 'function' ? bg(st.scene) : bg;
  const c = st.camera;
  const cam = `translate(480,270) scale(${c.zoom}) translate(${-(480 + c.x)},${-(270 + c.y)})`;
  const [bt, bo] = activeText(ep.bubbles, t);
  const [ct, co] = activeText(ep.captions, t, 0.3);
  return `<svg viewBox="0 0 960 540" width="960" height="540" xmlns="http://www.w3.org/2000/svg">
    <g transform="${cam}">${bgSVG}${coconutSVG(st.params)}${fg}${heartsSVG(t, st.hearts)}</g>
    ${bo > 0 ? bubbleSVG(bt, bo) : ''}${co > 0 ? captionSVG(ct, co) : ''}</svg>`;
}

async function main() {
  const args = process.argv.slice(2);
  const epPath = args[0];
  if (!epPath) { console.error('Usage: node render.js <episode.json> [--out file.mp4 | --stills t1,t2,...]'); process.exit(1); }
  const ep = JSON.parse(fs.readFileSync(epPath, 'utf8'));
  const epDir = path.dirname(path.resolve(epPath));
  const outIdx = args.indexOf('--out');
  const out = outIdx >= 0 ? args[outIdx + 1] : path.join('out', path.basename(epPath, '.json') + '.mp4');
  const stillsIdx = args.indexOf('--stills');
  const stills = stillsIdx >= 0 ? args[stillsIdx + 1].split(',').map(Number) : null;

  const fps = ep.fps || 24;
  const duration = ep.duration;
  const frames = Math.round(fps * duration);
  const bg = backgrounds[ep.background || 'room'];
  const fg = foregrounds[ep.foreground || 'none'];
  const cues = ep.mouthCues ? JSON.parse(fs.readFileSync(path.resolve(epDir, ep.mouthCues), 'utf8')) : null;
  const tracks = ep.keys || {};
  const blinkTimes = ep.blinks || [1.0, 4.7, 6.9, 8.9];

  const launchOpts = process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {};
  const browser = await chromium.launch(launchOpts);
  const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
  await page.setContent('<body style="margin:0;background:#000"><div id="stage"></div></body>');
  const draw = async (t, tailPhase, file) => {
    const st = frameState(ep, tracks, cues, blinkTimes, t, tailPhase);
    await page.evaluate(s => { document.getElementById('stage').innerHTML = s; }, frameSVG(ep, bg, fg, st, t));
    await page.screenshot({ path: file });
  };

  // tail phase integrates the speed track so speed changes never cause jumps
  const dt = 1 / fps;
  const phaseAt = [];
  let phase = 0;
  for (let i = 0; i <= frames; i++) {
    phaseAt.push(phase);
    phase += sample(tracks.tailSpeed, i * dt, DEFAULTS.tailSpeed) * dt;
  }

  if (stills) {
    fs.mkdirSync('out/stills', { recursive: true });
    for (const t of stills) {
      const file = path.join('out/stills', `${path.basename(epPath, '.json')}_t${t}.png`);
      await draw(t, phaseAt[Math.min(frames, Math.round(t * fps))], file);
      console.log('still:', file);
    }
    await browser.close();
    return;
  }

  fs.mkdirSync(path.dirname(out), { recursive: true });
  const tmp = fs.mkdtempSync(path.join(require('os').tmpdir(), 'coconut-'));
  for (let i = 0; i < frames; i++) {
    await draw(i * dt, phaseAt[i], path.join(tmp, `f${String(i).padStart(5, '0')}.png`));
    if (i % 48 === 0) process.stdout.write(`\rframe ${i}/${frames}`);
  }
  await browser.close();
  process.stdout.write(`\rframe ${frames}/${frames}\n`);

  const ff = ensureFfmpeg();
  const ffArgs = ['-loglevel', 'error', '-y', '-framerate', String(fps), '-i', path.join(tmp, 'f%05d.png')];
  if (ep.audio) ffArgs.push('-i', path.resolve(epDir, ep.audio));
  ffArgs.push('-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20');
  if (ep.audio) ffArgs.push('-c:a', 'aac', '-shortest');
  ffArgs.push(out);
  const r = spawnSync(ff, ffArgs, { stdio: 'inherit' });
  fs.rmSync(tmp, { recursive: true, force: true });
  if (r.status !== 0) { console.error('ffmpeg failed'); process.exit(1); }
  console.log('Done:', out);
}

main().catch(e => { console.error(e); process.exit(1); });
