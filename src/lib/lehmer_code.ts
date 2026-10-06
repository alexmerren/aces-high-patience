import type { Deck } from "../types"
import { createOrderedDeck } from "./deck_util";

const FACTORIAL_CACHE: bigint[] = [1n, 1n];
const DECK_SIZE = 52;

export const factorial = (n: number): bigint => {
  while (FACTORIAL_CACHE.length <= n) {
    const nextIndex = FACTORIAL_CACHE.length;
    FACTORIAL_CACHE.push(FACTORIAL_CACHE[nextIndex - 1] * BigInt(nextIndex))
  }
  return FACTORIAL_CACHE[n];
}

// TODO(alex): Add JSdoc here
export const encodeLehmerCode = (deck: Deck): bigint => {
  let result = 0n;
  const orderedDeck = createOrderedDeck();

  deck.forEach((card, index) => {
    const orderedCardsIndex = orderedDeck.findIndex((c) =>
      c.suit === card.suit && c.rank === card.rank
    );
    const numberOfRemainingCards = DECK_SIZE - 1 - index;
    const numberOfPermutationsForRemainingCards = factorial(numberOfRemainingCards)

    result += BigInt(orderedCardsIndex) * numberOfPermutationsForRemainingCards;

    orderedDeck.splice(orderedCardsIndex, 1);
  })

  return result;
}

// TODO(alex): Add JSdoc here
export const decodeLehmerCode = (code: bigint): Deck => {
  const result: Deck = [];
  const orderedDeck = createOrderedDeck();

  let remainingCode = code;

  for (let index = 0; index < DECK_SIZE; index++) {
    // numberOfRemainingCards is how many positions we are yet to choose.
    const numberOfRemainingCards = DECK_SIZE - 1 - index;
    const numberOfPermutationsForRemainingCards = factorial(numberOfRemainingCards);
    // cardIndex is the index of the card from an ordered deck of cards.
    const cardIndex = Number(remainingCode / numberOfPermutationsForRemainingCards);

    result.push(orderedDeck[cardIndex]);
    orderedDeck.splice(cardIndex, 1);

    remainingCode %= numberOfPermutationsForRemainingCards;
  }

  return result;
}