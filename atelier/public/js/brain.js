// Cap Web — cerveau à règles. Fonctions pures : aucun accès à la page.

// Vos réglages : recopiez ici la limite et les deux mots de votre cahier-personnel.json.

export const LIMITE = 220;

const MOTS = {
  lanterne: "La lanterne éclaire le chemin.",
  voisin: "Mon voisin habite à côté.",
  remparts: "Les remparts protégeaient la ville des assauts.",
};

const motsEnTexte = Object.keys(MOTS)
  .map((mot) => `« ${mot} »`)
  .join(" et ");

const REPONSES = {
  salut:
    "Bonjour ! Je suis Cap Web, un assistant à règles. Écrivez « aide » pour voir ce que je sais faire.",
  aide: `Je connais « salut », « aide », « test », et ${Object.keys(MOTS).length} mots à moi : ${motsEnTexte}.`,
  test: "Test bien reçu : mes règles fonctionnent.",
  repli:
    "Je ne connais pas encore cette phrase. Écrivez « aide » pour voir les mots que je connais.",
};

export function validateMessage(raw) {
  if (typeof raw !== "string") {
    return { ok: false, error: "Le message doit être du texte." };
  }
  const value = raw.trim();
  if (value === "") {
    return { ok: false, error: "Le message ne doit pas être vide." };
  }
  if (value.length > LIMITE) {
    return {
      ok: false,
      error: `Le message doit contenir ${LIMITE} caractères au maximum.`,
    };
  }
  return { ok: true, value };
}

export function replyTo(message) {
  const texte = String(message).trim().toLowerCase();
  if (texte === "salut" || texte === "bonjour") {
    return REPONSES.salut;
  }
  if (texte === "aide") {
    return REPONSES.aide;
  }
  if (texte === "test") {
    return REPONSES.test;
  }
  if (Object.hasOwn(MOTS, texte)) {
    return MOTS[texte];
  }
  // Message inconnu : un repli distinct, qui renvoie vers « aide ».
  return REPONSES.repli;
}

// Compte les mots d'un message : un mot est une suite de caractères sans espace. Pure : ne touche pas à la page.
export function compterMots(message) {
  if (typeof message !== "string") {
    return 0;
  }
  const texte = message.trim();
  if (texte === "") {
    return 0;
  }
  return texte.split(/\s+/).length;
}
