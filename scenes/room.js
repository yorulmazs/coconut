// Reusable backgrounds and foreground props. Add new locations here.
const backgrounds = {
  room: `
    <rect width="960" height="540" fill="#f1e8d3"/>
    <rect y="420" width="960" height="120" fill="#dcc9a5"/>
    <rect x="120" y="70" width="110" height="150" rx="10" fill="#e8dcc0" stroke="#d6c7a2" stroke-width="4"/>
    <rect x="140" y="90" width="70" height="110" rx="6" fill="#b9d6df"/>
    <line x1="175" y1="90" x2="175" y2="200" stroke="#e8dcc0" stroke-width="4"/>
    <ellipse cx="480" cy="478" rx="250" ry="26" fill="#000" opacity=".08"/>`
};

const foregrounds = {
  none: '',
  tunnel: `
    <rect x="270" y="440" width="420" height="110" rx="46" fill="#fbfaf6"/>
    <path d="M300,450 Q480,432 660,450" stroke="#e3dfd2" stroke-width="5" fill="none"/>
    <path d="M335,452 Q320,500 340,540" stroke="#e8e4d8" stroke-width="4" fill="none"/>
    <path d="M610,452 Q630,500 612,540" stroke="#e8e4d8" stroke-width="4" fill="none"/>`
};

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

module.exports = { backgrounds, foregrounds, bubbleSVG, captionSVG };
