import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.md': 'text/markdown',
};

http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  const filePath = path.join(__dirname, url === '/' ? 'index.html' : url);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME[ext] || 'text/plain';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      fs.readFile(path.join(__dirname, 'index.html'), (e2, d2) => {
        if (e2) { res.writeHead(404); res.end('Not found'); }
        else { res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); res.end(d2); }
      });
    } else {
      res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': 'no-cache' });
      res.end(data);
    }
  });
}).listen(PORT, '0.0.0.0', () => {
  console.log(`Quality Plumbing Service — serving on port ${PORT}`);
});
