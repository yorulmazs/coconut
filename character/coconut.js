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

// params: offsetY, tilt, earAngle, eyeWide, grumpy (0..1), blink (0..1),
//         tailAngle, breath, mouth (A-H,X)
function coconutSVG(params = {}) {
  const p = palette;
  const {
    offsetY = 0, tilt = 0, earAngle = 0, eyeWide = 0, grumpy = 1,
    blink = 0, tailAngle = 0, breath = 1, mouth = 'X'
  } = params;
  const ry = (22 + 8 * eyeWide) * (1 - 0.92 * blink);
  const pry = Math.max(1, (18 + 8 * eyeWide) * (1 - 0.92 * blink));
  const prx = 5 + 4 * eyeWide;
  const lid = 26 * grumpy * (1 - blink);

  return `
  <g transform="translate(0,${offsetY})">
    <g transform="rotate(${tailAngle},600,400)">
      <path d="M600,400 C680,400 710,330 680,290" stroke="${p.fur}" stroke-width="30" stroke-linecap="round" fill="none"/>
    </g>
    <g transform="translate(480,440) scale(1,${breath}) translate(-480,-440)">
      <ellipse cx="480" cy="385" rx="150" ry="112" fill="${p.fur}"/>
      <ellipse cx="480" cy="408" rx="46" ry="52" fill="${p.chest}"/>
      <ellipse cx="425" cy="440" rx="34" ry="21" fill="${p.fur}"/>
      <ellipse cx="415" cy="450" rx="17" ry="9" fill="${p.chest}"/>
      <ellipse cx="535" cy="440" rx="34" ry="21" fill="${p.fur}"/>
      <ellipse cx="545" cy="450" rx="17" ry="9" fill="${p.chest}"/>
    </g>
    <g transform="rotate(${tilt},480,340)">
      <g transform="rotate(${earAngle},420,215)">
        <polygon points="395,225 372,135 455,196" fill="${p.fur}"/>
        <polygon points="401,208 387,157 436,196" fill="${p.earInner}"/>
      </g>
      <g transform="rotate(${-earAngle},540,215)">
        <polygon points="565,225 588,135 505,196" fill="${p.fur}"/>
        <polygon points="559,208 573,157 524,196" fill="${p.earInner}"/>
      </g>
      <ellipse cx="480" cy="287" rx="108" ry="93" fill="${p.fur}"/>
      <ellipse cx="480" cy="248" rx="30" ry="20" fill="${p.furShadow}" opacity=".7"/>
      <ellipse cx="480" cy="325" rx="52" ry="36" fill="${p.muzzle}"/>
      <ellipse cx="437" cy="282" rx="25" ry="${ry}" fill="${p.eyeLeft}"/>
      <ellipse cx="437" cy="282" rx="${prx}" ry="${pry}" fill="${p.pupil}"/>
      <ellipse cx="523" cy="282" rx="25" ry="${ry}" fill="${p.eyeRight}"/>
      <ellipse cx="523" cy="282" rx="${prx}" ry="${pry}" fill="${p.pupil}"/>
      <polygon points="408,250 470,250 470,${252 + lid}" fill="${p.fur}"/>
      <polygon points="552,250 490,250 490,${252 + lid}" fill="${p.fur}"/>
      <path d="M470,310 L490,310 L480,322 Z" fill="${p.nose}"/>
      ${mouthSVG(mouth)}
      <g stroke="${p.whisker}" stroke-width="2" stroke-linecap="round" opacity=".9">
        <line x1="438" y1="326" x2="360" y2="312"/><line x1="438" y1="334" x2="358" y2="338"/><line x1="440" y1="342" x2="368" y2="360"/>
        <line x1="522" y1="326" x2="600" y2="312"/><line x1="522" y1="334" x2="602" y2="338"/><line x1="520" y1="342" x2="592" y2="360"/>
      </g>
    </g>
    <ellipse cx="480" cy="378" rx="76" ry="15" fill="none" stroke="${p.collar}" stroke-width="15"/>
    <g fill="${p.collarBead}"><circle cx="425" cy="383" r="8"/><circle cx="445" cy="391" r="8"/><circle cx="515" cy="391" r="8"/><circle cx="535" cy="383" r="8"/></g>
    <g transform="translate(498,402)">
      <g fill="${p.flower}"><circle cx="0" cy="-13" r="8"/><circle cx="13" cy="-4" r="8"/><circle cx="8" cy="11" r="8"/><circle cx="-8" cy="11" r="8"/><circle cx="-13" cy="-4" r="8"/></g>
      <circle cx="0" cy="0" r="12" fill="${p.flower}"/><circle cx="0" cy="0" r="6" fill="${p.flowerCenter}"/>
    </g>
    <circle cx="466" cy="398" r="9" fill="${p.bell}" stroke="${p.bellStroke}" stroke-width="2"/>
  </g>`;
}

module.exports = { coconutSVG, MOUTHS };
