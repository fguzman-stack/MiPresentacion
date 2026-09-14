import sharp from "sharp";

const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b0b1e"/>
      <stop offset="0.55" stop-color="#101030"/>
      <stop offset="1" stop-color="#1a1240"/>
    </linearGradient>
    <radialGradient id="glow1" cx="0.85" cy="0.15" r="0.6">
      <stop offset="0" stop-color="#8b6cff" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#8b6cff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.1" cy="0.9" r="0.7">
      <stop offset="0" stop-color="#54dcff" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#54dcff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#8b6cff"/>
      <stop offset="1" stop-color="#d66bff"/>
    </linearGradient>
    <linearGradient id="title" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#f4f1ff"/>
      <stop offset="1" stop-color="#c4b5fd"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow1)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>
  <g fill="#ffffff">
    <circle cx="150" cy="90" r="2" opacity="0.5"/>
    <circle cx="320" cy="150" r="1.5" opacity="0.4"/>
    <circle cx="520" cy="70" r="2" opacity="0.6"/>
    <circle cx="760" cy="130" r="1.5" opacity="0.4"/>
    <circle cx="980" cy="80" r="2.5" opacity="0.5"/>
    <circle cx="1120" cy="180" r="1.5" opacity="0.5"/>
    <circle cx="80" cy="420" r="1.5" opacity="0.35"/>
    <circle cx="240" cy="540" r="2" opacity="0.4"/>
    <circle cx="640" cy="580" r="1.5" opacity="0.35"/>
    <circle cx="1040" cy="480" r="2" opacity="0.45"/>
    <circle cx="1150" cy="580" r="1.5" opacity="0.4"/>
  </g>
  <rect x="80" y="248" width="92" height="6" rx="3" fill="url(#accent)"/>
  <text x="80" y="200" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="bold" letter-spacing="8" fill="#8b6cff">PORTAFOLIO</text>
  <text x="80" y="330" font-family="Arial, Helvetica, sans-serif" font-size="84" font-weight="bold" fill="url(#title)">Francisco Guzm&#225;n</text>
  <text x="80" y="398" font-family="Arial, Helvetica, sans-serif" font-size="38" fill="#b9bdd0">Desarrollador de Software y Soluciones Digitales</text>
  <text x="80" y="480" font-family="Consolas, Courier New, monospace" font-size="26" fill="#7c84a8">apps Android &#8226; sistemas web &#8226; software Windows &#8226; IA local</text>
  <text x="80" y="560" font-family="Consolas, Courier New, monospace" font-size="26" fill="#9b7bff">miportafolio-fguz.vercel.app</text>
</svg>
`;

await sharp(Buffer.from(svg)).png().toFile("public/og-image.png");
console.log("public/og-image.png generado");
