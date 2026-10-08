import test from 'node:test';
import assert from 'node:assert/strict';
import { estMessage } from '../public/js/brain.js';

// estMessage(m) dit si une valeur venue de l'extérieur a la forme d'un message : { role, text }.

test('un vrai message est accepté', () => {
  assert.equal(estMessage({ role: 'user', text: 'salut' }), true);
});

test('null est refusé', () => {
  assert.equal(estMessage(null), false);
});

test('un rôle inconnu est refusé', () => {
  assert.equal(estMessage({ role: 'pirate', text: 'salut' }), false);
});

test('un texte qui est un nombre est refusé', () => {
  assert.equal(estMessage({ role: 'user', text: 42 }), false);
});
