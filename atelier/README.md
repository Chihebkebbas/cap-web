# Cap Web

## À quoi sert Cap Web

Cap Web est un petit assistant de discussion qui tourne dans le navigateur, sur le thème de l'histoire d'une ville. Il répond avec des règles écrites à la main (ce n'est pas une IA) : vous écrivez un message, il vous répond, et la conversation est gardée dans le navigateur.
Le projet sert à apprendre le web : une page HTML, du CSS, du JavaScript séparé en modules, un petit serveur Node et des tests automatisés.

## Installer et lancer

Il faut Node.js 24.20 ou plus (`node --version`) et Git. Dans un terminal, depuis le dossier `atelier` :

```bash
npm ci
npm start
```

Ouvrez ensuite http://127.0.0.1:3000 dans le navigateur ; `Ctrl+C` arrête le serveur.
Les réglages du binôme (limite de 220 caractères, mots « lanterne » et « voisin ») sont dans `cahier-personnel.json`, déjà fourni : on ne le modifie pas.

Pour vérifier le projet, dans un second terminal :

```bash
npm test
npm run lint
```

`npm test` doit afficher `fail 0`, et `npm run lint` ne rien signaler. Lors de `npm ci`, npm annonce une vulnérabilité d'un outil de développement : c'est sans effet, ne lancez pas `npm audit fix`.

## Les 3 modules de `public/js`

- **`brain.js`, le cerveau.** Les règles de Cap Web : il vérifie un message (`validateMessage`, avec la limite `LIMITE`) et choisit la réponse (`replyTo`). Ce sont des fonctions pures : elles ne touchent jamais à la page, donc on les teste sans navigateur.
- **`view.js`, l'affichage.** Il dessine la liste des messages dans la page (`renderMessages`), avec `textContent` : un texte reste du texte, jamais du HTML. Il ne décide d'aucune réponse.
- **`app.js`, le câblage.** Il écoute le formulaire, appelle le cerveau, garde l'historique dans le navigateur (`localStorage`) et demande l'affichage à `view.js`.
