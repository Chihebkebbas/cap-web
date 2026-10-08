# Spécification de Cap Web

Chaque critère dit ce que fait Cap Web, puis ce qui le vérifie : un test automatique (`npm test`) ou un essai de 30 secondes dans la page. Si on retire le code concerné, la vérification échoue.

1. Quand on envoie 221 caractères, Cap Web refuse le message et l'erreur cite la limite de 220. Quand on en envoie 220, il l'accepte.
   Vérifié par : test « accepte 220 caractères et refuse 221 » (`tests/contrat/brain.contrat.test.js`) pour le refus et l'acceptation ; et par l'essai : dans la console du navigateur, `document.querySelector('#message').value = 'a'.repeat(221)`, puis Envoyer : l'erreur affichée cite 220.

2. Quand on envoie un message vide ou fait d'espaces seuls, Cap Web le refuse avec une erreur visible, et rien ne s'ajoute à la conversation.
   Vérifié par : tests « refuse le vide et les espaces seuls » (`brain.contrat.test.js`) et « un message fait d'espaces est refusé avec une erreur visible » (`browser/contrat.spec.js`).

3. Quand on envoie « lanterne » ou « voisin », avec des majuscules ou des espaces autour, Cap Web donne la même réponse propre à ce mot, différente de celle de « salut », « aide » et « test ».
   Vérifié par : test « reconnaît les deux mots du cahier personnel, quelles que soient la casse et les espaces autour » (`brain.contrat.test.js`).

4. Quand on envoie une phrase inconnue, Cap Web répond par un message de repli, distinct des réponses à « salut », « aide » et « test ».
   Vérifié par : test « répond à une phrase inconnue par un repli distinct » (`brain.contrat.test.js`).

5. Quand on envoie `<b>gras</b>`, Cap Web l'affiche tel quel, chevrons compris, sans créer de balise : le texte reste du texte.
   Vérifié par : tests « view.js affiche du texte et ne décide pas des réponses » (`brain.contrat.test.js`, aucun `innerHTML`) et « le texte reste du texte, jamais du HTML » (`browser/contrat.spec.js`) ; et par l'essai : lancer `npm start`, envoyer `<b>gras</b>`, vérifier que les chevrons sont visibles.
