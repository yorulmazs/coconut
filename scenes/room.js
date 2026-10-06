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
    <rect x="803" y="300" width="64" height="86" rx="22" fill="#5aa9d6"/>
    <rect x="790" y="306" width="14" height="52" rx="7" fill="#5aa9d6"/>
    <g transform="rotate(${-150 + wave},859,312)"><rect x="852" y="308" width="14" height="54" rx="7" fill="#5aa9d6"/><circle cx="859" cy="364" r="9" fill="#f4cfae"/></g>
    <circle cx="835" cy="270" r="34" fill="#f4cfae"/>
    <path d="M801,266 Q835,222 869,266 Q835,246 801,266Z" fill="#7a5230"/>
    <circle cx="824" cy="274" r="3.5" fill="#3a2b20"/><circle cx="846" cy="274" r="3.5" fill="#3a2b20"/>
    <path d="M824,286 Q835,296 846,286" stroke="#3a2b20" stroke-width="3" fill="none" stroke-linecap="round"/>
  </g>`;
}

// backgrounds are functions of the scene state: { t, doorOpen, visitorX, visitorWave, visitorWalk }
const backgrounds = {
  room: s => {
    const open = s.doorOpen || 0;
    const panelW = 130 * (1 - 0.85 * smooth(open));
    return `
    <rect width="960" height="540" fill="#f1e8d3"/>
    <rect y="420" width="960" height="120" fill="#dcc9a5"/>
    <rect x="120" y="70" width="110" height="150" rx="10" fill="#e8dcc0" stroke="#d6c7a2" stroke-width="4"/>
    <rect x="140" y="90" width="70" height="110" rx="6" fill="#b9d6df"/>
    <line x1="175" y1="90" x2="175" y2="200" stroke="#e8dcc0" stroke-width="4"/>
    <ellipse cx="480" cy="500" rx="250" ry="26" fill="#000" opacity=".08"/>
    <rect x="766" y="126" width="138" height="298" rx="6" fill="#d9ccae"/>
    <rect x="770" y="130" width="130" height="294" fill="${open > 0.05 ? '#cfe3ee' : '#a8794f'}"/>
    ${open > 0.4 ? visitorSVG(s) : ''}
    <rect x="770" y="130" width="${panelW}" height="294" fill="#a8794f" stroke="#8c6240" stroke-width="3"/>
    ${open < 0.3 ? '<circle cx="880" cy="285" r="7" fill="#e6c36a"/>' : ''}`;
  }
};

const foregrounds = {
  none: '',
  tunnel: `
    <rect x="270" y="440" width="420" height="110" rx="46" fill="#fbfaf6"/>
    <path d="M300,450 Q480,432 660,450" stroke="#e3dfd2" stroke-width="5" fill="none"/>
    <path d="M335,452 Q320,500 340,540" stroke="#e8e4d8" stroke-width="4" fill="none"/>
    <path d="M610,452 Q630,500 612,540" stroke="#e8e4d8" stroke-width="4" fill="none"/>`,
  // lower tunnel: shows more of Coconut, needs a deeper hiding offset (~345)
  tunnelLow: `
    <rect x="270" y="470" width="420" height="110" rx="46" fill="#fbfaf6"/>
    <path d="M300,480 Q480,462 660,480" stroke="#e3dfd2" stroke-width="5" fill="none"/>
    <path d="M335,482 Q322,520 342,545" stroke="#e8e4d8" stroke-width="4" fill="none"/>
    <path d="M610,482 Q628,520 612,545" stroke="#e8e4d8" stroke-width="4" fill="none"/>`
};

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
  return `<g opacity="${opacity}">
    <rect x="590" y="90" width="320" height="74" rx="22" fill="#fff" stroke="#d6c7a2" stroke-width="4"/>
    <polygon points="650,164 640,196 684,164" fill="#fff" stroke="#d6c7a2" stroke-width="4" stroke-linejoin="round"/>
    <rect x="644" y="161" width="42" height="6" fill="#fff"/>
    <text x="750" y="138" text-anchor="middle" font-size="28" font-weight="700" fill="#4d4a42" font-family="Arial, Helvetica, sans-serif">${text}</text>
  </g>`;
}

function captionSVG(text, opacity) {
  return `<text x="480" y="512" text-anchor="middle" font-size="26" font-weight="700" fill="#4d4a42" opacity="${opacity}" font-family="Arial, Helvetica, sans-serif">${text}</text>`;
}

module.exports = { backgrounds, foregrounds, bubbleSVG, captionSVG, heartsSVG };
