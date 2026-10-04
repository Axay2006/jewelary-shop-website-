// Node script using built-in zlib to output standard compliant PNG icons
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createPNG(width, height, isMaskable = false) {
  // RGBA buffer
  const rowBytes = width * 4 + 1; // 1 filter byte per line
  const buffer = Buffer.alloc(rowBytes * height);

  const cx = width / 2;
  const cy = height / 2;
  const scale = width / 512;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowBytes;
    buffer[rowOffset] = 0; // Filter type 0 (None)

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;

      // Base background: #131314
      let r = 19;
      let g = 19;
      let b = 20;
      let a = 255;

      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Gold aura glow in center
      const maxGlow = width * 0.45;
      if (dist < maxGlow) {
        const factor = Math.max(0, 1 - dist / maxGlow);
        r = Math.min(255, Math.round(r + 242 * factor * 0.35));
        g = Math.min(255, Math.round(g + 202 * factor * 0.35));
        b = Math.min(255, Math.round(b + 80 * factor * 0.35));
      }

      // Diamond geometry
      // Diamond vertices: (256, 70), (410, 190), (256, 430), (102, 190)
      const nx = x / scale;
      const ny = y / scale;

      // Check if inside diamond
      let inDiamond = false;
      if (ny >= 70 && ny <= 430) {
        let halfWidth = 0;
        if (ny <= 190) {
          halfWidth = ((ny - 70) / (190 - 70)) * (410 - 256);
        } else {
          halfWidth = ((430 - ny) / (430 - 190)) * (410 - 256);
        }
        if (Math.abs(nx - 256) <= halfWidth) {
          inDiamond = true;
          // Fill diamond interior slightly lighter
          r = Math.min(255, Math.round(r * 0.7 + 35));
          g = Math.min(255, Math.round(g * 0.7 + 33));
          b = Math.min(255, Math.round(b * 0.7 + 34));
        }

        // Diamond border lines
        const edgeDist = Math.abs(Math.abs(nx - 256) - halfWidth);
        if (edgeDist < 8) {
          // Gold line #f2ca50
          r = 242;
          g = 202;
          b = 80;
        }

        // Horizontal table line at ny = 190
        if (Math.abs(ny - 190) < 6 && Math.abs(nx - 256) <= halfWidth) {
          r = 242;
          g = 202;
          b = 80;
        }

        // Diagonal facet lines
        // Line from (256, 70) to (170, 190) and (342, 190)
        if (ny >= 70 && ny <= 190) {
          const expectedX1 = 256 - ((ny - 70) / 120) * 86;
          const expectedX2 = 256 + ((ny - 70) / 120) * 86;
          if (Math.abs(nx - expectedX1) < 6 || Math.abs(nx - expectedX2) < 6) {
            r = 242;
            g = 202;
            b = 80;
          }
        }
        // Line from (170, 190) to (256, 430) and (342, 190) to (256, 430)
        if (ny >= 190 && ny <= 430) {
          const expectedX1 = 170 + ((ny - 190) / 240) * 86;
          const expectedX2 = 342 - ((ny - 190) / 240) * 86;
          if (Math.abs(nx - expectedX1) < 6 || Math.abs(nx - expectedX2) < 6) {
            r = 242;
            g = 202;
            b = 80;
          }
        }
      }

      // Center dot at (256, 250)
      const dotDist = Math.sqrt((nx - 256) ** 2 + (ny - 250) ** 2);
      if (dotDist <= 14) {
        r = 242;
        g = 202;
        b = 80;
      }

      buffer[pxOffset] = r;
      buffer[pxOffset + 1] = g;
      buffer[pxOffset + 2] = b;
      buffer[pxOffset + 3] = a;
    }
  }

  // Deflate compressed IDAT
  const compressed = zlib.deflateSync(buffer);

  // PNG Signature
  const pngSig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR Chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // Bit depth
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0; // Compression
  ihdr[11] = 0; // Filter
  ihdr[12] = 0; // Interlace
  const ihdrChunk = makeChunk('IHDR', ihdr);

  // IDAT Chunk
  const idatChunk = makeChunk('IDAT', compressed);

  // IEND Chunk
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([pngSig, ihdrChunk, idatChunk, iendChunk]);
}

function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);

  const crc = crc32(chunk.subarray(4, 8 + len));
  chunk.writeUInt32BE(crc >>> 0, 8 + len);
  return chunk;
}

// Standard CRC32 table
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return crc ^ 0xffffffff;
}

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), createPNG(192, 192));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), createPNG(512, 512));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), createPNG(512, 512, true));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), createPNG(180, 180));
console.log('PWA PNG icons generated successfully!');
