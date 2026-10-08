# Conventions du projet Cap Web

Ces règles s'adressent à toute personne qui touche au code, et à tout agent d'IA : ce qui n'est pas écrit ici, ni l'un ni l'autre ne le sait.

## Nommage

- **Une fonction** porte un verbe qui dit ce qu'elle fait, en camelCase : `validateMessage`, `renderMessages`, `replyTo`. Une fonction qui répond par vrai ou faux commence par `est`.
- **Une constante** de réglage s'écrit en MAJUSCULES : `LIMITE`, `MOTS`, `REPONSES`. Une autre variable ou constante s'écrit en camelCase, avec un nom qui dit ce qu'elle contient : `motsEnTexte`, pas `liste`.
- **Un fichier** s'écrit en minuscules et garde un seul rôle : `brain.js` (les règles), `view.js` (l'affichage), `app.js` (le câblage). Un fichier de test se nomme `<sujet>.test.js` et se range dans `tests/`.
- **Un message de commit** commence par un type suivi de deux-points, puis dit ce qui change : `feat:`, `fix:`, `docs:`, `test:`, `refactor:` ou `ci:`. Un commit fait un seul changement.

## Interdits

1. Ne modifie jamais `tests/contrat/`, `browser/contrat.spec.js` ni `cahier-personnel.json`. Si un test te semble faux, arrête-toi et explique pourquoi.
2. N'écris aucune clé, aucun mot de passe et aucune donnée personnelle dans un fichier, un commit ou une conversation d'IA.
3. N'utilise jamais `innerHTML`, `outerHTML` ni `insertAdjacentHTML` dans `public/js` : un texte reste du texte, on l'affiche avec `textContent`.
4. Ne touche jamais à la page dans `brain.js` : ni `document`, ni `window`, ni `localStorage`. Les règles restent des fonctions pures.
5. N'ajoute aucune dépendance (`npm install`) sans accord : la liste autorisée est dans `dependances-autorisees.json`. Ne lance pas `npm audit fix`.
6. Ne fais aucun commit sans avoir lu `git diff`, et sans que `npm run lint` et `npm test` passent. Pas de `git push --force`.
