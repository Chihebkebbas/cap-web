import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createApp } from '../server/app.js';

// Test de la route JSON /api/conseil : elle répond 200, en JSON, avec un conseil en texte.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..', 'public');

let serveur;
let baseUrl;

before(async () => {
  const app = createApp({ publicDir, version: 'test-conseil' });
  await new Promise((resolve) => {
    serveur = app.listen(0, '127.0.0.1', resolve);
  });
  const adresse = serveur.address();
  const port = typeof adresse === 'object' && adresse !== null ? adresse.port : 0;
  baseUrl = `http://127.0.0.1:${port}`;
});

after(
  () =>
    new Promise((resolve, reject) => {
      if (!serveur) {
        resolve();
        return;
      }
      serveur.close((erreur) => (erreur ? reject(erreur) : resolve()));
    }),
);

test('GET /api/conseil renvoie du JSON avec un conseil', async () => {
  const reponse = await fetch(`${baseUrl}/api/conseil`);
  assert.equal(reponse.status, 200);
  const mime = reponse.headers.get('content-type') ?? '';
  assert.match(mime, /application\/json/, `MIME JSON attendu, reçu : ${mime}`);
  const donnees = await reponse.json();
  assert.equal(typeof donnees.conseil, 'string');
  assert.ok(donnees.conseil.length > 0, 'le conseil ne doit pas être vide');
});
