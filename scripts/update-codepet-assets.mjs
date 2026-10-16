import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

// Pin the source so screenshots and branding can be reproduced together.
const source = "https://raw.githubusercontent.com/fguzman-stack/CodePet/d908029892de3e7bc08aff79681a01cfc935f76f/";
const root = new URL("../public/images/", import.meta.url);
async function download(path) {
  const response = await fetch(source + path);
  if (!response.ok) throw new Error(`${response.status}: ${path}`);
  return Buffer.from(await response.arrayBuffer());
}

// The legacy mipmap PNGs still contain the old robot. Convert the current
// standalone Android VectorDrawable, preserving paths, groups and gradients.
function vectorToSvg(xml) {
  const attrs = (text) => Object.fromEntries([...text.matchAll(/([\w:]+)="([^"]*)"/g)].map((m) => [m[1].replace("android:", ""), m[2]]));
  const defs = [];
  let gradientIndex = 0;
  const body = [...xml.matchAll(/<group\b[^>]*>|<\/group>|<path\b[^>]*?(?:\/>|>[\s\S]*?<\/path>)/g)].map(([token]) => {
    if (token === "</group>") return "</g>";
    const a = attrs(token.slice(0, token.indexOf(">") + 1));
    if (token.startsWith("<group")) return `<g transform="translate(${a.translateX ?? 0} ${a.translateY ?? 0}) scale(${a.scaleX ?? 1} ${a.scaleY ?? 1})">`;
    let fill = a.fillColor ?? "none";
    const gradient = token.match(/<gradient\b([^>]*)>([\s\S]*?)<\/gradient>/);
    if (gradient) {
      const g = attrs(gradient[1]);
      const id = `gradient-${gradientIndex++}`;
      const radial = g.type === "radial";
      const tag = radial ? "radialGradient" : "linearGradient";
      const coordinates = radial ? `cx="${g.centerX}" cy="${g.centerY}" r="${g.gradientRadius}"` : `x1="${g.startX}" y1="${g.startY}" x2="${g.endX}" y2="${g.endY}"`;
      const stops = [...gradient[2].matchAll(/<item\b([^>]*)\/>/g)].map(([, item]) => {
        const stop = attrs(item);
        return `<stop offset="${stop.offset}" stop-color="${stop.color}"/>`;
      }).join("");
      defs.push(`<${tag} id="${id}" gradientUnits="userSpaceOnUse" ${coordinates}>${stops}</${tag}>`);
      fill = `url(#${id})`;
    }
    // Android accepts 1.0/0.0 arc flags; SVG requires integer flag tokens.
    const path = a.pathData.replace(/(-?\d+)\.0(?=[\s,]|$)/g, "$1");
    return `<path d="${path}" fill="${fill}" fill-opacity="${a.fillAlpha ?? 1}" stroke="${a.strokeColor ?? "none"}" stroke-opacity="${a.strokeAlpha ?? 1}" stroke-width="${a.strokeWidth ?? 0}" stroke-linecap="${a.strokeLineCap ?? "butt"}" stroke-linejoin="${a.strokeLineJoin ?? "miter"}"/>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 108 108"><defs>${defs.join("")}</defs>${body}</svg>`;
}

await mkdir(new URL("gallery/", root), { recursive: true });
await mkdir(new URL("icons/", root), { recursive: true });
await Promise.all(Array.from({ length: 7 }, async (_, i) => {
  const input = await download(`capturas_de_pantalla/captura_${i + 1}.jpeg`);
  const output = new URL(`gallery/codepet-v320-${String(i + 1).padStart(2, "0")}.webp`, root);
  await sharp(input).resize({ width: 900, withoutEnlargement: true }).webp({ quality: 90 }).toFile(fileURLToPath(output));
}));
const vector = await download("app/src/main/res/mipmap-anydpi/ic_launcher.xml");
await sharp(Buffer.from(vectorToSvg(vector.toString("utf8")))).webp({ quality: 95 }).toFile(fileURLToPath(new URL("icons/codepet-v320.webp", root)));
console.log("Updated seven CodePet screenshots and the current Codey launcher icon.");
