// Cap Web — câblage : lire le formulaire, mettre à jour l'historique, demander l'affichage.
import { validateMessage, replyTo, LIMITE } from './brain.js';
import { renderMessages } from './view.js';

const formulaire = document.querySelector('#chat-form');
const champ = document.querySelector('#message');
const liste = document.querySelector('#messages');
const statut = document.querySelector('#status');
const effacer = document.querySelector('#effacer');
const versionElt = document.querySelector('#version');
const limiteElt = document.querySelector('#limite');
const compteur = document.querySelector('#compteur');

const CLE = 'capweb.historique';
const historique = [];

function sauvegarder() {
  localStorage.setItem(CLE, JSON.stringify(historique));
}

function charger() {
  const brut = localStorage.getItem(CLE);
  if (brut === null) {
    return;
  }
  try {
    const donnees = JSON.parse(brut);
    if (Array.isArray(donnees)) {
      historique.push(...donnees);
    }
  } catch {
    statut.textContent = 'Conversation précédente illisible : nouvelle conversation.';
  }
}

// Affiche « longueur / LIMITE » sous le champ.
function majCompteur() {
  compteur.textContent = `${champ.value.length} / ${LIMITE}`;
}

// Demande un conseil au serveur ; si le serveur ne répond pas, renvoie un message clair.
async function demanderConseil() {
  try {
    const reponse = await fetch('/api/conseil', { headers: { accept: 'application/json' } });
    if (!reponse.ok) {
      throw new Error(`Statut ${reponse.status}`);
    }
    const donnees = await reponse.json();
    if (typeof donnees.conseil !== 'string') {
      throw new Error('Conseil absent de la réponse');
    }
    return donnees.conseil;
  } catch {
    return 'Le serveur ne répond pas : conseil indisponible.';
  }
}

formulaire.addEventListener('submit', async (event) => {
  event.preventDefault();
  const controle = validateMessage(champ.value);
  if (!controle.ok) {
    statut.textContent = controle.error;
    champ.focus();
    return;
  }
  // « conseil » est la seule réponse qui vient du serveur ; le reste vient des règles de brain.js.
  const reponse = controle.value.toLowerCase() === 'conseil' ? await demanderConseil() : replyTo(controle.value);
  historique.push({ role: 'user', text: controle.value });
  historique.push({ role: 'assistant', text: reponse });
  sauvegarder();
  renderMessages(historique, liste);
  champ.value = '';
  majCompteur();
  statut.textContent = '';
  champ.focus();
});

effacer.addEventListener('click', () => {
  if (!confirm('Effacer toute la conversation ?')) {
    return;
  }
  historique.length = 0;
  localStorage.removeItem(CLE);
  renderMessages(historique, liste);
  statut.textContent = 'Conversation effacée.';
});

// La limite vient de brain.js : un seul endroit à modifier.
champ.maxLength = LIMITE;
limiteElt.textContent = String(LIMITE);
champ.addEventListener('input', majCompteur);
majCompteur();

charger();
renderMessages(historique, liste);

// Lit /version.json ; en cas de panne ou de réponse inattendue, le pied de page le dit.
async function afficherVersion() {
  try {
    const reponse = await fetch('/version.json', { headers: { accept: 'application/json' } });
    if (!reponse.ok) {
      throw new Error(`Statut ${reponse.status}`);
    }
    const donnees = await reponse.json();
    if (typeof donnees.version !== 'string') {
      throw new Error('Version absente de la réponse');
    }
    versionElt.textContent = `version ${donnees.version}`;
  } catch {
    versionElt.textContent = 'version indisponible';
  }
}

afficherVersion();
