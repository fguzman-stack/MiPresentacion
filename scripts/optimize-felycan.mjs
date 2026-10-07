import sharp from "sharp";
import { stat } from "node:fs/promises";

// Run from the project root: node scripts/optimize-felycan.mjs
for (const [name, width] of [["felycan-preview", 1597], ["felycan-preview-small", 800]]) {
  const output = `public/images/${name}.webp`;
  await sharp("felycan.png").resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(output);
  console.log(`${output}: ${Math.round((await stat(output)).size / 1024)} KB`);
}
