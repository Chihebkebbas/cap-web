# Cap Web

## À quoi sert Cap Web

Cap Web est un petit assistant de discussion qui tourne dans le navigateur, sur le thème de l'histoire d'une ville. Il répond avec des règles écrites à la main (ce n'est pas une IA) : vous écrivez un message, il vous répond, et la conversation est gardée dans le navigateur. Le mot « conseil » est la seule réponse qui vient du serveur.
Le projet sert à apprendre le web : une page HTML, du CSS, du JavaScript séparé en modules, un petit serveur Node avec une route JSON, et des tests automatisés.

## Installer et lancer

Il faut Node.js 24.20 ou plus (`node --version`) et Git. Dans un terminal :

```bash
git clone https://github.com/Chihebkebbas/cap-web.git
cd cap-web/atelier
npm ci
npm start
```

Ouvrez ensuite http://127.0.0.1:3000 dans le navigateur ; `Ctrl+C` arrête le serveur. Si le port 3000 est déjà pris, lancez `PORT=3001 npm start` et ouvrez http://127.0.0.1:3001.
Les réglages du binôme (limite de 220 caractères, mots « lanterne » et « voisin ») sont dans `cahier-personnel.json`, déjà fourni : on ne le modifie pas.

## Tester

Dans un second terminal, depuis le dossier `atelier` :

```bash
npm test
npm run lint
```

`npm test` doit afficher `fail 0` (54 tests), et `npm run lint` ne rien signaler. Lors de `npm ci`, npm annonce une vulnérabilité d'un outil de développement : c'est sans effet, ne lancez pas `npm audit fix`.
Les tests du dossier `tests/contrat/` sont le contrat du formateur : on corrige le code, jamais ces tests.

## Utiliser Cap Web

- Écrivez un message et appuyez sur **Entrée** pour l'envoyer ; **Maj+Entrée** va à la ligne.
- Le compteur sous le champ affiche « longueur / 220 » ; il passe en rouge et en gras à partir de 90 % de la limite. Un message vide ou de plus de 220 caractères est refusé, avec une erreur visible.
- Cap Web connaît « salut », « aide », « test », trois mots à nous (« lanterne », « voisin », « remparts ») et « conseil ». Écrivez « aide » pour les voir ; toute autre phrase reçoit une réponse de repli.
- La conversation est gardée dans le navigateur (`localStorage`) et revient après un rechargement ; le bouton « Effacer la conversation » la vide.

## La route `/api/conseil`

Le serveur répond à `GET /api/conseil` par un conseil tiré au hasard parmi trois, en JSON :

```bash
curl -i http://127.0.0.1:3000/api/conseil
```

La réponse a le statut `200`, l'en-tête `content-type: application/json; charset=utf-8` et un corps de la forme `{ "conseil": "…" }`. Quand l'utilisateur écrit « conseil », `app.js` appelle cette route avec `fetch` ; si le serveur ne répond pas, la page affiche « Le serveur ne répond pas : conseil indisponible. » au lieu de planter. La route est testée dans `tests/conseil.test.js`.
Le serveur sert aussi `/version.json` (la version lue dans `package.json`, affichée dans le pied de page).

## Les 3 modules de `public/js`

- **`brain.js`, le cerveau.** Les règles de Cap Web : il vérifie un message (`validateMessage`, avec la limite `LIMITE`), choisit la réponse (`replyTo`), compte les mots (`compterMots`) et vérifie qu'une valeur venue de l'extérieur a la forme d'un message (`estMessage`). Ce sont des fonctions pures : elles ne touchent jamais à la page, donc on les teste sans navigateur.
- **`view.js`, l'affichage.** Il dessine la liste des messages dans la page (`renderMessages`), avec `textContent` : un texte reste du texte, jamais du HTML. Il ne décide d'aucune réponse.
- **`app.js`, le câblage.** Il écoute le formulaire et le clavier, appelle le cerveau, garde l'historique dans le navigateur (`localStorage`), demande l'affichage à `view.js` et parle au serveur avec `fetch` (`demanderConseil`, `afficherVersion`).

## Arborescence du projet

```text
atelier/
├── public/                  ce que le navigateur reçoit
│   ├── index.html           la page
│   ├── styles.css           l'apparence
│   └── js/
│       ├── brain.js         les règles : fonctions pures, jamais la page
│       ├── view.js          l'affichage des messages
│       └── app.js           le câblage : événements, mémoire, fetch
├── server/
│   ├── start.js             lance le serveur (port et version)
│   └── app.js               sert les fichiers de public/ et la route /api/conseil
├── tests/                   les tests automatiques, lancés par npm test
│   ├── contrat/             le contrat du formateur : on ne le modifie pas
│   ├── harnais/             tests des outils du projet
│   └── *.test.js            nos tests (compterMots, conseil, estMessage)
├── browser/                 tests dans un vrai navigateur (Playwright, facultatifs)
├── scripts/                 outils du projet (version, contrôles)
├── cahier-personnel.json    nos réglages : limite et mots
├── SPEC.md                  la spécification : critères et leur vérification
├── AGENTS.md                les conventions de nommage et les interdits
└── package.json             les commandes npm (start, test, lint)
```

À la racine du dépôt, `.github/workflows/ci.yml` lance le lint et les tests à chaque push et à chaque pull request.
