import { it } from 'node:test';
import assert from 'node:assert/strict';
import { compterMots } from '../public/js/brain.js';

// Critères C1 à C5 de la fiche R3 (fonction F2) : compterMots(message) compte les mots d'un message.

it('C1 : compte les mots séparés par des espaces', () => {
  assert.equal(compterMots('salut'), 1);
  assert.equal(compterMots('où est le refuge'), 4);
});

it('C2 : plusieurs espaces, tabulations et retours à la ligne ne font qu’un séparateur', () => {
  assert.equal(compterMots('un   deux'), 2);
  assert.equal(compterMots('un\tdeux\ntrois'), 3);
});

it('C3 : les espaces autour du message ne comptent pas', () => {
  assert.equal(compterMots('   salut   '), 1);
});

it('C4 : un message vide ou fait d’espaces seuls compte 0 mot', () => {
  assert.equal(compterMots(''), 0);
  assert.equal(compterMots('   '), 0);
  assert.equal(compterMots(' \t\n '), 0);
});

it('C5 : ce qui n’est pas du texte compte 0 mot, sans erreur', () => {
  for (const entree of [undefined, null, 42, {}, []]) {
    assert.equal(compterMots(entree), 0);
  }
});
