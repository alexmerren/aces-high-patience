import { describe, test, expect } from "vitest";
import { createOrderedDeck } from "./deck_util";
import { encodeLehmerCode, decodeLehmerCode, factorial } from "./lehmer_code";

const DECK_SIZE = 52;

describe('lehmer_code', () => {
  describe('encodeLehmerCode', () => {
    test('encodes the default ordered deck to 0n (identity permutation)', () => {
      const orderedDeck = createOrderedDeck();
      expect(encodeLehmerCode(orderedDeck)).toBe(0n);
    });

    test('encodes the fully reversed deck to (DECK_SIZE! - 1)', () => {
      const reversedDeck = createOrderedDeck().reverse();
      const expectedMaxCode = factorial(DECK_SIZE) - 1n;

      expect(encodeLehmerCode(reversedDeck)).toBe(expectedMaxCode);
    });

    test('generates distinct codes for different permutations', () => {
      const deckA = createOrderedDeck();
      const deckB = createOrderedDeck();
      // Swap first two cards
      [deckB[0], deckB[1]] = [deckB[1], deckB[0]];

      expect(encodeLehmerCode(deckA)).not.toBe(encodeLehmerCode(deckB));
    });
  });

  describe('decodeLehmerCode', () => {
    test('decodes 0n back to the original ordered deck', () => {
      const decoded = decodeLehmerCode(0n);
      expect(decoded).toEqual(createOrderedDeck());
    });

    test('decodes max permutation code to the reversed deck', () => {
      const maxCode = factorial(DECK_SIZE) - 1n;
      expect(decodeLehmerCode(maxCode)).toEqual(createOrderedDeck().reverse());
    });

    test('produces a deck with exact size and no duplicate cards', () => {
      const arbitraryCode = 12345678901234567890n;
      const decoded = decodeLehmerCode(arbitraryCode);

      expect(decoded).toHaveLength(DECK_SIZE);
      const uniqueCards = new Set(decoded.map((c) => `${c.suit}_${c.rank}`));
      expect(uniqueCards.size).toBe(DECK_SIZE);
    });
  });

  describe('round-trip encoding & decoding', () => {
    test('round-trips the identity deck', () => {
      const deck = createOrderedDeck();
      expect(decodeLehmerCode(encodeLehmerCode(deck))).toEqual(deck);
    });

    test('round-trips the reversed deck', () => {
      const deck = createOrderedDeck().reverse();
      expect(decodeLehmerCode(encodeLehmerCode(deck))).toEqual(deck);
    });

    test('round-trips rotated deck permutations', () => {
      const deck = createOrderedDeck();
      const rotatedDeck = [...deck.slice(10), ...deck.slice(0, 10)];

      expect(decodeLehmerCode(encodeLehmerCode(rotatedDeck))).toEqual(rotatedDeck);
    });

    test('round-trips deterministically shuffled decks', () => {
      const deck = createOrderedDeck();
      for (let i = deck.length - 1; i > 0; i--) {
        const j = (i * 13) % (i + 1);
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }

      const encoded = encodeLehmerCode(deck);
      const decoded = decodeLehmerCode(encoded);

      expect(decoded).toEqual(deck);
    });
  });
});