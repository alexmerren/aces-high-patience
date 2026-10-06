import type { Deck } from "../types";
import { fromIndexToCard } from "./card_util";

const fromIndicesToDeck = (indices: number[]): Deck => {
  return indices.map((index) => fromIndexToCard(index))
}

// Fisher-Yates Shuffle
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
const shuffleArray = (array: number[]): number[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const createOrderedArray = (): number[] =>
  Array.from({ length: 52 }, (_, i) => i)

// TODO(alex): Add JSdoc here
export const createOrderedDeck = (): Deck => {
  return fromIndicesToDeck(createOrderedArray());
}

// TODO(alex): Add JSdoc here
export const createShuffledDeck = (): Deck => {
  const orderedArray = createOrderedArray();
  const shuffledArray = shuffleArray(orderedArray);
  return fromIndicesToDeck(shuffledArray);
}
