// Reusable backgrounds, props and foregrounds. Add new locations here.
const smooth = x => { x = Math.min(1, Math.max(0, x)); return x * x * (3 - 2 * x); };

// A friendly cartoon visitor standing in the doorway (simple, generic character).
function visitorSVG(s) {
  const wave = Math.sin(s.t * 8) * 22 * s.visitorWave;
  const hop = Math.abs(Math.sin(s.t * 6)) * 6 * s.visitorWalk;
  return `<g transform="translate(${s.visitorX},${-hop})">
    <ellipse cx="835" cy="436" rx="38" ry="8" fill="#000" opacity=".1"/>
    <rect x="812" y="380" width="14" height="52" rx="6" fill="#4a5568"/>
    <rect x="842" y="380" width="14" height="52" rx="6" fill="#4a5568"/>
    <rect x="803" y="300" width="64" height="86" rx="22" fill="#3fb37f"/>
    <rect x="790" y="306" width="14" height="52" rx="7" fill="#3fb37f"/>
    <g transform="rotate(${-150 + wave},859,312)"><rect x="852" y="308" width="14" height="54" rx="7" fill="#3fb37f"/><circle cx="859" cy="364" r="9" fill="#f4cfae"/></g>
    <circle cx="835" cy="270" r="34" fill="#f4cfae"/>
    <path d="M801,266 Q835,222 869,266 Q835,246 801,266Z" fill="#7a5230"/>
    <circle cx="824" cy="274" r="3.5" fill="#3a2b20"/><circle cx="846" cy="274" r="3.5" fill="#3a2b20"/>
    <path d="M824,286 Q835,296 846,286" stroke="#3a2b20" stroke-width="3" fill="none" stroke-linecap="round"/>
  </g>`;
}

// Scene palette, chosen from research on young children and color (sources: docs/ANIMATION_PLAYBOOK.md "Renk ve sahne zenginliği"):
// - bright, light colors -> positive feelings; dark brown/black/gray -> negative (Boyatzis & Varghese 1994, 4-5 y studies),
//   so no big dark areas (Coconut herself is the only gray thing, so she stands out)
// - attraction is highest for high brightness with saturation a bit below maximum (not neon), very low contrast hurts focus (Frontiers 2023)
// - warm hues slightly preferred; walls in low-saturation red and high-saturation blue gave positive emotions (preschool classroom study)
const ROOM = {
  wallTop: '#fde3d9', wallBottom: '#f9cfc2',   // light, low-saturation coral (warm, calm)
  wainscot: '#f6bfae', trim: '#ffffff',
  floor: '#f6cf8e', floorLine: '#ecbb72',      // light honey wood
  rug: '#ffd85e', rugBorder: '#ff9f6b',        // sunny yellow rug under Coconut: strong contrast with her blue-gray fur
  skyTop: '#4fb4ec', skyBottom: '#a9dcf7',     // saturated sky blue in the window
  cloud: '#ffffff', sun: '#ffd23f',
  curtain: '#ffcd4d', curtainShade: '#f5b52e',
  door: '#3d9be0', doorShade: '#2f86c7', doorFrame: '#ffffff', knob: '#ffd23f', hall: '#fff6dc',
  leaf: '#46b96f', leafDark: '#329a58', pot: '#ff8a5c', potRim: '#ff7146',
  frame: '#ffffff', picture: '#bfe8ff',
  bird: '#ff6f61'
};

const wrap = (x, a, b) => a + ((((x - a) % (b - a)) + (b - a)) % (b - a));

// window with sky, sun, drifting clouds and a bird that crosses every ~9 s; the sky moves slower than the room (parallax)
function windowSVG(s) {
  const t = s.t || 0;
  const par = (s.camX || 0) * 0.3;
  const c1 = wrap(60 + t * 9 + par, 40, 300), c2 = wrap(190 + t * 6 + par, 40, 300);
  const bp = (t % 9) / 9;                       // bird phase
  const bx = 70 + bp * 230 + par, by = 120 + Math.sin(bp * Math.PI * 2) * 10;
  const flap = Math.sin(t * 14) * 5;
  return `
    <defs><clipPath id="win"><rect x="96" y="66" width="168" height="168" rx="10"/></clipPath>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${ROOM.skyTop}"/><stop offset="1" stop-color="${ROOM.skyBottom}"/></linearGradient></defs>
    <rect x="86" y="56" width="188" height="188" rx="16" fill="${ROOM.trim}"/>
    <g clip-path="url(#win)">
      <rect x="90" y="60" width="180" height="180" fill="url(#sky)"/>
      <circle cx="${222 + par}" cy="104" r="22" fill="${ROOM.sun}"/>
      <g fill="${ROOM.cloud}"><ellipse cx="${c1}" cy="150" rx="30" ry="13"/><ellipse cx="${c1 + 18}" cy="141" rx="18" ry="13"/>
        <ellipse cx="${c2}" cy="196" rx="24" ry="10"/><ellipse cx="${c2 - 12}" cy="189" rx="13" ry="10"/></g>
      ${bp < 0.95 ? `<path d="M${bx - 9},${by - flap} Q${bx - 4},${by - 3} ${bx},${by} Q${bx + 4},${by - 3} ${bx + 9},${by - flap}" stroke="${ROOM.bird}" stroke-width="3.5" fill="none" stroke-linecap="round"/>` : ''}
    </g>
    <rect x="177" y="66" width="6" height="168" fill="${ROOM.trim}"/><rect x="96" y="147" width="168" height="6" fill="${ROOM.trim}"/>`;
}

function curtainsSVG(t) {
  const sw = Math.sin(t * 0.9) * 3;
  const one = (x, dir) => `<path d="M${x},44 L${x + dir * 46},44 Q${x + dir * (40 + sw)},150 ${x + dir * (52 + sw)},262 L${x},262 Z" fill="${ROOM.curtain}"/>
    <path d="M${x + dir * 16},50 Q${x + dir * (14 + sw * 0.6)},160 ${x + dir * (20 + sw)},258" stroke="${ROOM.curtainShade}" stroke-width="5" fill="none"/>`;
  return `<rect x="62" y="38" width="236" height="10" rx="5" fill="${ROOM.curtainShade}"/>${one(66, 1)}${one(294, -1)}`;
}

function plantSVG(t) {
  const sw = Math.sin(t * 1.1) * 2.5 + Math.sin(t * 2.7) * 0.8;   // slow sway, never fully still
  const leaf = (ang, len, col) => `<g transform="rotate(${ang + sw},120,380)"><ellipse cx="120" cy="${380 - len / 2}" rx="15" ry="${len / 2}" fill="${col}"/></g>`;
  return `${leaf(-38, 96, ROOM.leafDark)}${leaf(34, 100, ROOM.leafDark)}${leaf(-14, 120, ROOM.leaf)}${leaf(14, 112, ROOM.leaf)}${leaf(0, 135, ROOM.leaf)}
    <path d="M88,378 L152,378 L144,440 L96,440 Z" fill="${ROOM.pot}"/><rect x="82" y="370" width="76" height="16" rx="6" fill="${ROOM.potRim}"/>`;
}

// backgrounds are functions of the scene state: { t, camX, doorOpen, visitorX, visitorWave, visitorWalk }
const backgrounds = {
  room: s => {
    const t = s.t || 0;
    const open = s.doorOpen || 0;
    const panelW = 130 * (1 - 0.85 * smooth(open));
    const beam = 0.16 + 0.04 * Math.sin(t * 0.8);   // sunbeam slowly breathes
    return `
    <defs><linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${ROOM.wallTop}"/><stop offset="1" stop-color="${ROOM.wallBottom}"/></linearGradient></defs>
    <rect x="-120" y="-80" width="1200" height="520" fill="url(#wall)"/>
    <rect x="-120" y="330" width="1200" height="92" fill="${ROOM.wainscot}"/>
    <rect x="-120" y="326" width="1200" height="8" fill="${ROOM.trim}"/>
    <rect x="-120" y="420" width="1200" height="220" fill="${ROOM.floor}"/>
    <g stroke="${ROOM.floorLine}" stroke-width="3">${[440, 468, 505, 550].map(y => `<line x1="-120" y1="${y}" x2="1080" y2="${y}"/>`).join('')}</g>
    <rect x="-120" y="416" width="1200" height="8" fill="${ROOM.trim}"/>
    ${windowSVG(s)}${curtainsSVG(t)}
    <polygon points="110,240 260,240 520,540 160,540" fill="#fff3b0" opacity="${beam.toFixed(3)}"/>
    <rect x="606" y="74" width="100" height="84" rx="8" fill="${ROOM.frame}"/><rect x="616" y="84" width="80" height="64" rx="4" fill="${ROOM.picture}"/>
    <g transform="translate(656,118)" fill="${ROOM.sun}"><circle cx="0" cy="-12" r="8"/><circle cx="12" cy="-3" r="8"/><circle cx="8" cy="11" r="8"/><circle cx="-8" cy="11" r="8"/><circle cx="-12" cy="-3" r="8"/><circle r="8" fill="#ff9f6b"/></g>
    ${plantSVG(t)}
    <ellipse cx="480" cy="492" rx="300" ry="44" fill="${ROOM.rugBorder}"/>
    <ellipse cx="480" cy="492" rx="282" ry="36" fill="${ROOM.rug}"/>
    <ellipse cx="480" cy="492" rx="250" ry="28" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="10 9" opacity=".8"/>
    <ellipse cx="480" cy="500" rx="230" ry="22" fill="#000" opacity=".1"/>
    <rect x="758" y="118" width="154" height="306" rx="8" fill="${ROOM.doorFrame}"/>
    <rect x="770" y="130" width="130" height="294" fill="${open > 0.05 ? ROOM.hall : ROOM.door}"/>
    <rect x="770" y="130" width="${panelW}" height="294" fill="${ROOM.door}"/>
    ${panelW > 60 ? `<rect x="786" y="150" width="${panelW - 32}" height="110" rx="8" fill="${ROOM.doorShade}" opacity=".5"/><rect x="786" y="285" width="${panelW - 32}" height="120" rx="8" fill="${ROOM.doorShade}" opacity=".5"/>` : ''}
    ${open < 0.3 ? `<circle cx="880" cy="285" r="8" fill="${ROOM.knob}"/>` : ''}
    ${open > 0.4 ? visitorSVG(s) : ''}`;
  }
};

const tunnel = (y) => `
    <rect x="270" y="${y}" width="420" height="110" rx="46" fill="#46a9e3"/>
    <g fill="none" stroke="#8fd3f5" stroke-width="10" opacity=".9">
      <path d="M330,${y + 4} Q318,${y + 50} 334,${y + 106}"/><path d="M420,${y + 2} Q412,${y + 50} 422,${y + 108}"/>
      <path d="M540,${y + 2} Q548,${y + 50} 538,${y + 108}"/><path d="M630,${y + 4} Q642,${y + 50} 626,${y + 106}"/></g>
    <path d="M300,${y + 10} Q480,${y - 8} 660,${y + 10}" stroke="#ffffff" stroke-width="5" fill="none" opacity=".6"/>`;

const foregrounds = {
  none: '',
  tunnel: tunnel(440),
  // lower tunnel: shows more of Coconut, needs a deeper hiding offset (~345)
  tunnelLow: tunnel(470)
};

// near layer (drawn above everything, moves faster than the room when the camera moves): a soft out-of-focus leaf
function nearLayerSVG(t) {
  const sw = Math.sin(t * 0.9 + 1) * 2;
  return `<defs><filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4"/></filter></defs>
    <g transform="rotate(${sw},-20,560)" opacity=".85" filter="url(#soft)"><ellipse cx="30" cy="520" rx="34" ry="92" transform="rotate(32,30,520)" fill="${ROOM.leafDark}"/>
    <ellipse cx="78" cy="548" rx="28" ry="74" transform="rotate(58,78,548)" fill="${ROOM.leaf}"/></g>`;
}

function heartsSVG(t, intensity, cx = 480, cy = 175) {
  if (intensity <= 0.01) return '';
  let out = '';
  for (let i = 0; i < 6; i++) {
    const phase = (t * 0.45 + i / 6) % 1;
    const x = cx + (i % 2 ? 1 : -1) * (40 + i * 16) + Math.sin(t * 3 + i) * 10;
    const y = cy - phase * 150;
    const o = intensity * (1 - phase) * Math.min(1, phase * 6);
    const sc = 0.5 + (i % 3) * 0.18;
    out += `<path transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${sc})" d="M0,0 C-10,-12 -24,2 0,18 C24,2 10,-12 0,0Z" fill="#e8788a" opacity="${o.toFixed(2)}"/>`;
  }
  return out;
}

function bubbleSVG(text, opacity) {
  // bubble width follows the text so short symbols ("!", "?") get a small bubble
  const w = Math.min(320, Math.max(90, 22 * text.length + 60));
  const x = 750 - w / 2;
  return `<g opacity="${opacity}">
    <rect x="${x}" y="90" width="${w}" height="74" rx="22" fill="#fff" stroke="#46a9e3" stroke-width="4"/>
    <polygon points="${x + 40},164 ${x + 30},196 ${x + 74},164" fill="#fff" stroke="#46a9e3" stroke-width="4" stroke-linejoin="round"/>
    <rect x="${x + 34}" y="161" width="42" height="6" fill="#fff"/>
    <text x="750" y="138" text-anchor="middle" font-size="28" font-weight="700" fill="#4d4a42" font-family="Arial, Helvetica, sans-serif">${text}</text>
  </g>`;
}

function captionSVG(text, opacity) {
  // caption sits in its own sunny pill at the top, never painted onto a prop
  const w = Math.max(160, 15 * text.length + 70);
  return `<g opacity="${opacity}"><rect x="${480 - w / 2}" y="16" width="${w}" height="50" rx="25" fill="#ffd23f" stroke="#ffffff" stroke-width="4"/>
    <text x="480" y="50" text-anchor="middle" font-size="26" font-weight="700" fill="#3d3a33" font-family="Arial, Helvetica, sans-serif">${text}</text></g>`;
}

module.exports = { backgrounds, foregrounds, nearLayerSVG, bubbleSVG, captionSVG, heartsSVG, ROOM };
