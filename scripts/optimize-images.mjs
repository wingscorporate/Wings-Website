import sharp from 'sharp';
import { readdir, mkdir, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';

// Originals stay untouched. Only the generated derivatives are imported by Vite.
const folders = ['ad account ss', 'shopify ss', 'team photos', 'inbox ss'];
const metadata = {};
let originalBytes = 0, optimizedBytes = 0;
for (const folder of folders) {
  const input = path.join('src/images', folder);
  const output = path.join('src/images/optimized', folder);
  await mkdir(output, { recursive: true });
  for (const file of await readdir(input)) {
    if (!/\.(jpg|jpeg|png|webp|avif)$/i.test(file)) continue;
    const image = sharp(path.join(input, file)).rotate();
    const name = `${file}.webp`;
    const full = await image.clone().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 88, effort: 6 }).toBuffer({ resolveWithObject: true });
    const small = await image.clone().resize({ width: 640, withoutEnlargement: true }).webp({ quality: 85, effort: 6 }).toBuffer({ resolveWithObject: true });
    await writeFile(path.join(output, name), full.data);
    await writeFile(path.join(output, `${file}.small.webp`), small.data);
    metadata[name] = { width: full.info.width, height: full.info.height, smallWidth: small.info.width };
    originalBytes += (await stat(path.join(input, file))).size;
    optimizedBytes += full.data.length;
  }
}
await writeFile('src/images/optimized/metadata.json', JSON.stringify(metadata, null, 2) + '\n');
console.log(JSON.stringify({ originalBytes, optimizedBytes, reduction: `${((1 - optimizedBytes / originalBytes) * 100).toFixed(1)}%` }));
