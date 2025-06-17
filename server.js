import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Express test route (kan tas bort senare)
app.get('/', (req, res) => {
  res.send('Swingnotes API är igång!');
});

// Skapa HTTP server manuellt
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Servern svarar med vanlig text');
});

// Starta Express server
app.listen(PORT, () => {
  console.log(`Express API kör på http://localhost:${PORT}`);
});

// Starta manuell HTTP server på annan port (för demo, t.ex. 3001)
const HTTP_PORT = 3001;
server.listen(HTTP_PORT, () => {
  console.log(`HTTP server kör på http://localhost:${HTTP_PORT}`);
});
