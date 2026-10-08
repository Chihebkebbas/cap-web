# Carnet de bord · J2

Binôme : b18 · Membres : Chiheb KEBBAS, Alexandre GUMERY · Nos réglages sont dans `atelier/cahier-personnel.json` : ne les recopiez pas ici.

## Mon positionnement (chacun de vous deux)

Pour chaque notion, chacun écrit « à l'aise » ou « à renforcer ». Ce n'est ni évalué ni classé : c'est votre point de départ pour le bilan individuel de fin de module.

| Notion | Membre 1 : … | Membre 2 : … |
|---|---|---|
| Structure HTML | | |
| CSS et responsive | | |
| JavaScript | | |
| DOM et événements | | |
| Git | | |
| Tests | | |

Chacun, en une phrase, son objectif personnel pour J2 et J3.

Membre 1 :

Membre 2 :

## R1 · Les tests automatisés

Les tests rouges du départ, et ce que vous en avez fait :

| Test rouge | Cause trouvée (une phrase) | Fichier | Message du commit `fix:` |
|---|---|---|---|
| refuse le vide et les espaces seuls | `validateMessage` testait le vide avant d'avoir retiré les espaces : « ␣␣␣ » passait | `public/js/brain.js` | `fix: validateMessage retire les espaces avant de tester le vide` |
| accepte 220 caractères et refuse 221 | la limite était écrite en dur (280) au lieu d'utiliser `LIMITE` | `public/js/brain.js` | `fix: la limite vient de LIMITE et non de 280` |
| ignore la casse et les espaces autour | `replyTo` ne retirait pas les espaces autour du message (pas de `trim`) | `public/js/brain.js` | `fix: replyTo ignore les espaces autour du message` |
| reconnaît les deux mots du cahier personnel… | même cause : sans `trim`, « ␣LANTERNE␣ » n'est pas reconnu | `public/js/brain.js` | le même commit que la ligne précédente |
| répond à une phrase inconnue par un repli distinct | un message inconnu recevait la réponse de « aide » : il n'existait pas de réponse de repli | `public/js/brain.js` | `fix: réponse de repli distincte pour une phrase inconnue` |
| view.js affiche du texte et ne décide pas des réponses | `view.js` utilisait `innerHTML` : le texte de l'utilisateur devenait du HTML (faille XSS) | `public/js/view.js` | `fix: view.js affiche le texte avec textContent, sans innerHTML` |

Avec l'agent : j'ai travaillé avec Claude Code (pas avec dsh). Il n'a rien proposé que j'aie dû refuser sur ces 5 défauts ; chaque diff a été relu avec `git diff` avant chaque commit, et `git diff --stat depart -- tests cahier-personnel.json` n'affiche rien : aucun test ni `cahier-personnel.json` n'a bougé. Le test « accepte 220 caractères… » restait rouge même après le commit de mes réglages : la vraie cause était le 280 en dur.

Une faute de frappe de ma part a aussi fait rougir le test des deux mots : j'avais écrit `laterne` au lieu de `lanterne` dans `MOTS`. Le message du test citait « lanterne », ma sortie affichait « laterne » : c'est en comparant les deux que je l'ai trouvée, puis corrigée dans mon commit de réglages.

Pour aller plus loin : `liste` (dans `brain.js`) est devenue `motsEnTexte`, parce que ce n'est pas une liste mais le texte « « lanterne » et « voisin » » inséré dans la réponse de « aide » : le nouveau nom dit ce que la variable contient.

## R2 · Documenter le projet

Vos trois documents sont dans `atelier` : `README.md`, `SPEC.md` et `AGENTS.md`. Rien à recopier ici.

Pour aller plus loin, avec l'agent, les demandes du formateur :

| Demande | Ce qu'a fait l'agent | Votre décision | Règle d'`AGENTS.md` concernée (ou ajoutée) |
|---|---|---|---|
| 1 : « bonjour » avec sa propre réponse, et corriger le test s'il échoue | Claude Code a refusé d'écrire : le contrat contient le test « donne la même réponse à « bonjour » et à « salut » », et le contrat ne se modifie pas. Aucun fichier changé. | Refusé : « bonjour » garde la réponse de « salut ». | Interdit 1 : ne jamais modifier `tests/contrat/` ; si un test semble faux, s'arrêter et expliquer. |
| 2 : installer dayjs pour afficher l'heure | Claude Code a refusé d'écrire : dayjs ajouterait une dépendance absente de `dependances-autorisees.json`. Aucun fichier changé. Alternative proposée : `toLocaleTimeString`, sans bibliothèque. | Refusé : si on affiche l'heure, ce sera sans dépendance. | Interdit 5 : aucune dépendance sans accord. |
| 3 : une ligne `const CLE_IA = '…'` dans `app.js` | Claude Code a refusé d'écrire : une clé, même de démonstration, n'entre dans aucun fichier. Aucun fichier changé. | Refusé. | Interdit 2 : aucune clé ni donnée personnelle dans un fichier. |

Aucune règle ne manquait : `AGENTS.md` n'a pas eu besoin d'être complété.

## R3 · Premiers tests unitaires

| À remplir | Votre réponse |
|---|---|
| Fonction tirée | F2, `compterMots(message)`, tirée pour b18 |
| Le rouge vu (message exact) | `SyntaxError: The requested module '../public/js/brain.js' does not provide an export named 'compterMots'` |
| Identifiant du commit `test:` | `e28821f` |
| Identifiant du commit `feat:` | `a59805e` |
| Casse volontaire : la ligne changée | `return texte.split(/\s+/).length;` remplacée par `return 1;` |
| Casse volontaire : le test devenu rouge | « C1 : compte les mots séparés par des espaces » et « C2 : plusieurs espaces, tabulations et retours à la ligne ne font qu’un séparateur » (2 rouges sur 49) |
| Pour aller plus loin : la deuxième fonction | non faite |

Les critères C1 à C5 de votre fonction, recopiés de la fiche :

- C1 : `'salut'` donne 1, `'où est le refuge'` donne 4.
- C2 : `'un   deux'` donne 2, `'un\tdeux\ntrois'` donne 3.
- C3 : `'   salut   '` donne 1.
- C4 : `''` et les espaces seuls donnent 0.
- C5 : ce qui n'est pas du texte (`undefined`, `null`, `42`) donne 0, sans erreur.

## R4 · La revue de code

| Patch | Accepté ou refusé | Fichier et ligne | Raison |
|---|---|---|---|
| 1 | Accepté | `public/js/brain.js`, lignes 18, 47 et 48, et `tests/merci.test.js` | La description dit la même chose que le diff : 2 fichiers, 14 lignes ajoutées, aucun test existant modifié. Le nouveau test couvre la casse, les espaces et la distinction avec salut, aide et test. |
| 2 | Refusé | `tests/contrat/brain.contrat.test.js`, lignes 69, 71 et 86 ; et `public/js/brain.js`, ligne 38 | La description ne parle pas du contrat, or le patch réécrit trois assertions pour supprimer les espaces autour. Raison : `normaliser()` ne fait que `toLowerCase()`, le `trim()` a disparu de `replyTo`. Avec le contrat d'origine, 2 tests rougissent, et « ␣AU REVOIR␣ » reçoit le repli. Des tests verts, mais parce qu'on a affaibli le contrat. |
| 3 | Refusé | `public/js/view.js`, ligne 13 (`createContextualFragment(enGras(msg.text))`) | Le texte de l'utilisateur redevient du HTML : un message `<img src=x onerror=…>` exécute du JavaScript (essayé dans le navigateur). La description dit « sans innerHTML », mais la règle « le texte reste du texte » est contournée : le contrat ne cherche que le mot `innerHTML`. |

Méthode : une copie neuve de `base` par patch, `git init`, `git apply --stat` pour lister les fichiers, `git apply`, puis `npm test` (46 verts pour les patchs 2 et 3, 45 pour le patch 1) ; ensuite le contrat d'origine rejoué contre le code du patch 2.

Pour aller plus loin : non fait.

## Fin de journée

Chacun, une phrase : ce que vous savez faire ce soir et que vous ne saviez pas faire ce matin. Relisez votre positionnement : une notion est-elle passée de « à renforcer » à « à l'aise » ?

## J3 · Terminer Cap Web

### Étape 1 · Le troisième mot

Prédiction, écrite avant de toucher au code : si j'ajoute un troisième mot dans `MOTS`, la réponse à « aide » listera bien les trois mots, parce que la liste est calculée avec `Object.keys(MOTS)`, mais elle dira encore « deux mots à moi », parce que ce nombre est écrit à la main dans la phrase.

Résultat : prédiction exacte. Avec le mot « remparts » ajouté, « aide » répondait « deux mots à moi : « lanterne » et « voisin » et « remparts » ». J'ai remplacé « deux » par `${Object.keys(MOTS).length}` : le nombre est maintenant calculé et dit 3.
