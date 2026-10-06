// Coconut: the single source of truth for how Coconut looks.
// Every episode calls coconutSVG(); nothing else may draw the cat.
const palette = require('./palette.json');

const MOUTHS = {
  // Rhubarb Lip Sync shapes A-H + X (idle)
  X: { type: 'smile' },
  A: { type: 'line' },
  B: { type: 'open', rx: 8, ry: 4 },
  C: { type: 'open', rx: 12, ry: 9 },
  D: { type: 'open', rx: 15, ry: 14 },
  E: { type: 'open', rx: 8, ry: 8 },
  F: { type: 'open', rx: 5, ry: 5 },
  G: { type: 'line' },
  H: { type: 'open', rx: 10, ry: 6 }
};

const DEFAULTS = {
  offsetX: 0, offsetY: 0,
  squashX: 1, squashY: 1,        // squash & stretch around the floor point
  tilt: 0, headBob: 0,
  lookX: 0, lookY: 0,            // -1..1, fake 3D head turn + eye direction
  earAngle: 0, earL: 0, earR: 0,
  eyeWide: 0, grumpy: 1, blink: 0, eyesClosed: 0,
  tailAngle: 0, tailTip: 0,
  breath: 1,
  mouth: 'X',
  pawL: 0, pawR: 0, pawWave: 0,  // lift 0..1, wave in degrees
  bell: 0                        // collar tag swing in degrees
};

function mouthSVG(shape) {
  const p = palette;
  const m = MOUTHS[shape] || MOUTHS.X;
  if (m.type === 'open') {
    return `<ellipse cx="480" cy="338" rx="${m.rx}" ry="${m.ry}" fill="${p.mouthInside}" stroke="${p.mouthLine}" stroke-width="3"/>`;
  }
  if (m.type === 'line') {
    return `<path d="M466,336 L494,336" stroke="${p.mouthLine}" stroke-width="3" stroke-linecap="round"/>`;
  }
  return `<path d="M480,322 Q480,334 466,336 M480,322 Q480,334 494,336" stroke="${p.mouthLine}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
}

// point on the collar curve (quadratic bezier across the front of the neck)
function collarPoint(t) {
  const P0 = [408, 366], P1 = [480, 404], P2 = [552, 366];
  const u = 1 - t;
  return [u * u * P0[0] + 2 * u * t * P1[0] + t * t * P2[0], u * u * P0[1] + 2 * u * t * P1[1] + t * t * P2[1]];
}

function legSVG(side, lift, wave) {
  const p = palette;
  const s = side === 'L' ? -1 : 1;
  const shoulder = [480 + s * 40, 398];
  const restPaw = [480 + s * 52, 462];   // front legs reach down to the floor
  const upPaw = [480 + s * 168, 318];    // lifted paw: out beside the body so it reads against the background
  const paw = [restPaw[0] + (upPaw[0] - restPaw[0]) * lift, restPaw[1] + (upPaw[1] - restPaw[1]) * lift];
  return `<g transform="rotate(${wave * lift},${shoulder[0]},${shoulder[1]})">
    <path d="M${shoulder[0]},${shoulder[1]} L${paw[0]},${paw[1]}" stroke="${p.fur}" stroke-width="42" stroke-linecap="round" fill="none"/>
    <ellipse cx="${paw[0]}" cy="${paw[1] + 6}" rx="21" ry="11" fill="${p.chest}"/>
  </g>`;
}

// Collar: a band across the front of the neck, a crochet flower on one side,
// and the bell + yellow flower tag hanging from the centre. Attached to the body, symmetric band.
function collarSVG(bell) {
  const p = palette;
  const [bx, by] = collarPoint(0.5);
  const [fx, fy] = collarPoint(0.26);
  const beads = [0.14, 0.38, 0.62, 0.74, 0.86].map(t => {
    const [x, y] = collarPoint(t);
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.5" fill="${p.collarBead}"/>`;
  }).join('');
  const petals = [0, 60, 120, 180, 240, 300].map(a => {
    const r = a * Math.PI / 180;
    return `<circle cx="${(fx + Math.cos(r) * 9).toFixed(1)}" cy="${(fy + Math.sin(r) * 9).toFixed(1)}" r="7" fill="${p.collar}" stroke="${p.collarBead}" stroke-width="1.5"/>`;
  }).join('');
  return `
    <path d="M408,366 Q480,404 552,366" fill="none" stroke="${p.collar}" stroke-width="15" stroke-linecap="round"/>
    ${beads}
    ${petals}<circle cx="${fx.toFixed(1)}" cy="${fy.toFixed(1)}" r="5" fill="${p.collarBead}"/>
    <g transform="rotate(${bell},${bx},${by})">
      <circle cx="${bx}" cy="${by + 1}" r="3" fill="${p.bellStroke}"/>
      <circle cx="${bx - 6}" cy="${by + 19}" r="9" fill="${p.bell}" stroke="${p.bellStroke}" stroke-width="2"/>
      <g transform="translate(${bx + 15},${by + 24})">
        <g fill="${p.flower}"><circle cx="0" cy="-9" r="6"/><circle cx="9" cy="-3" r="6"/><circle cx="6" cy="8" r="6"/><circle cx="-6" cy="8" r="6"/><circle cx="-9" cy="-3" r="6"/></g>
        <circle cx="0" cy="0" r="9" fill="${p.flower}"/><circle cx="0" cy="0" r="4.5" fill="${p.flowerCenter}"/>
      </g>
    </g>`;
}

function coconutSVG(params = {}) {
  const p = palette;
  const d = { ...DEFAULTS, ...params };
  const blink = Math.max(d.blink, d.eyesClosed);
  const ry = (22 + 8 * d.eyeWide) * (1 - 0.92 * blink);
  const pry = Math.max(1, (18 + 8 * d.eyeWide) * (1 - 0.92 * blink));
  const prx = 5 + 4 * d.eyeWide;
  const lid = 26 * d.grumpy * (1 - blink);
  const lx = d.lookX, ly = d.lookY;
  const pupX = lx * 7, pupY = ly * 4;
  const faceDX = lx * 13, faceDY = ly * 5;
  const tailTip = d.tailTip;

  return `
  <g transform="translate(${d.offsetX},${d.offsetY})">
   <g transform="translate(480,440) scale(${d.squashX},${d.squashY}) translate(-480,-440)">
    <g transform="rotate(${d.tailAngle},600,400)">
      <path d="M600,402 C670,402 ${704 + tailTip * 0.5},348 ${682 + tailTip},292" stroke="${p.fur}" stroke-width="30" stroke-linecap="round" fill="none"/>
    </g>
    <g transform="translate(480,440) scale(1,${d.breath}) translate(-480,-440)">
      <ellipse cx="480" cy="385" rx="150" ry="112" fill="${p.fur}"/>
      <ellipse cx="480" cy="408" rx="46" ry="52" fill="${p.chest}"/>
    </g>
    ${legSVG('L', d.pawL, d.pawWave)}
    ${legSVG('R', d.pawR, d.pawWave)}
    <g transform="translate(${lx * 10},${d.headBob}) rotate(${d.tilt},480,340)">
      <g transform="translate(${lx * 5},0) rotate(${d.earAngle + d.earL},420,215)">
        <polygon points="395,225 372,135 455,196" fill="${p.fur}"/>
        <polygon points="401,208 387,157 436,196" fill="${p.earInner}"/>
      </g>
      <g transform="translate(${lx * 5},0) rotate(${-d.earAngle + d.earR},540,215)">
        <polygon points="565,225 588,135 505,196" fill="${p.fur}"/>
        <polygon points="559,208 573,157 524,196" fill="${p.earInner}"/>
      </g>
      <ellipse cx="480" cy="287" rx="108" ry="93" fill="${p.fur}"/>
      <g transform="translate(${faceDX},${faceDY})">
        <ellipse cx="480" cy="248" rx="30" ry="20" fill="${p.furShadow}" opacity=".7"/>
        <ellipse cx="480" cy="325" rx="52" ry="36" fill="${p.muzzle}"/>
        <ellipse cx="437" cy="282" rx="25" ry="${ry}" fill="${p.eyeLeft}"/>
        <ellipse cx="${437 + pupX}" cy="${282 + pupY}" rx="${prx}" ry="${pry}" fill="${p.pupil}"/>
        <ellipse cx="523" cy="282" rx="25" ry="${ry}" fill="${p.eyeRight}"/>
        <ellipse cx="${523 + pupX}" cy="${282 + pupY}" rx="${prx}" ry="${pry}" fill="${p.pupil}"/>
        <polygon points="408,250 470,250 470,${252 + lid}" fill="${p.fur}"/>
        <polygon points="552,250 490,250 490,${252 + lid}" fill="${p.fur}"/>
        <path d="M470,310 L490,310 L480,322 Z" fill="${p.nose}"/>
        ${mouthSVG(d.mouth)}
        <g stroke="${p.whisker}" stroke-width="2" stroke-linecap="round" opacity=".9">
          <line x1="438" y1="326" x2="360" y2="312"/><line x1="438" y1="334" x2="358" y2="338"/><line x1="440" y1="342" x2="368" y2="360"/>
          <line x1="522" y1="326" x2="600" y2="312"/><line x1="522" y1="334" x2="602" y2="338"/><line x1="520" y1="342" x2="592" y2="360"/>
        </g>
      </g>
    </g>
    <g transform="rotate(${d.tilt * 0.5},480,360)">${collarSVG(d.bell)}</g>
   </g>
  </g>`;
}

module.exports = { coconutSVG, MOUTHS, DEFAULTS };
