#!/usr/bin/env node
// Usage: node render.js episodes/pilot-visitor.json [--out out/name.mp4]
// Renders an episode (JSON timeline) to MP4 using only the shared Coconut character.
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { chromium } = require('playwright');
const { coconutSVG } = require('./character/coconut');
const { backgrounds, foregrounds, bubbleSVG, captionSVG } = require('./scenes/room');

const DEFAULTS = {
  offsetY: 0, tilt: 0, earAngle: 0, eyeWide: 0, grumpy: 1,
  tailAmp: 12, tailSpeed: 2.4
};

const smooth = x => { x = Math.min(1, Math.max(0, x)); return x * x * (3 - 2 * x); };

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

function mouthAt(cues, t) {
  if (!cues) return 'X';
  for (const c of cues.mouthCues) if (t >= c.start && t < c.end) return c.value;
  return 'X';
}

function ensureFfmpeg() {
  try { return require('ffmpeg-static'); } catch (_) { return 'ffmpeg'; }
}

async function main() {
  const args = process.argv.slice(2);
  const epPath = args[0];
  if (!epPath) { console.error('Usage: node render.js <episode.json> [--out file.mp4]'); process.exit(1); }
  const ep = JSON.parse(fs.readFileSync(epPath, 'utf8'));
  const epDir = path.dirname(path.resolve(epPath));
  const outIdx = args.indexOf('--out');
  const out = outIdx >= 0 ? args[outIdx + 1] : path.join('out', path.basename(epPath, '.json') + '.mp4');
  fs.mkdirSync(path.dirname(out), { recursive: true });

  const fps = ep.fps || 24;
  const duration = ep.duration;
  const frames = Math.round(fps * duration);
  const bg = backgrounds[ep.background || 'room'];
  const fg = foregrounds[ep.foreground || 'none'];
  const cues = ep.mouthCues ? JSON.parse(fs.readFileSync(path.resolve(epDir, ep.mouthCues), 'utf8')) : null;
  const tracks = ep.keys || {};
  const blinkTimes = ep.blinks || [1.0, 4.7, 6.9, 8.9];

  const tmp = fs.mkdtempSync(path.join(require('os').tmpdir(), 'coconut-'));
  const launchOpts = process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {};
  const browser = await chromium.launch(launchOpts);
  const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
  await page.setContent('<body style="margin:0;background:#000"><div id="stage"></div></body>');

  let tailPhase = 0;
  const dt = 1 / fps;
  for (let i = 0; i < frames; i++) {
    const t = i * dt;
    const v = name => sample(tracks[name], t, DEFAULTS[name]);
    tailPhase += v('tailSpeed') * dt;
    const params = {
      offsetY: v('offsetY'), tilt: v('tilt') + Math.sin(t * 0.9) * 1.5,
      earAngle: v('earAngle'), eyeWide: v('eyeWide'), grumpy: v('grumpy'),
      blink: blinkAt(t, blinkTimes),
      tailAngle: Math.sin(tailPhase) * v('tailAmp') - 4,
      breath: 1 + 0.012 * Math.sin(t * 2.2),
      mouth: mouthAt(cues, t)
    };
    const [bt, bo] = activeText(ep.bubbles, t);
    const [ct, co] = activeText(ep.captions, t, 0.3);
    const svg = `<svg viewBox="0 0 960 540" width="960" height="540" xmlns="http://www.w3.org/2000/svg">
      ${bg}${coconutSVG(params)}${fg}${bo > 0 ? bubbleSVG(bt, bo) : ''}${co > 0 ? captionSVG(ct, co) : ''}</svg>`;
    await page.evaluate(s => { document.getElementById('stage').innerHTML = s; }, svg);
    await page.screenshot({ path: path.join(tmp, `f${String(i).padStart(5, '0')}.png`) });
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
