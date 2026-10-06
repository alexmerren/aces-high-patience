import { Rank, Suit, type Card } from "../types";

const RANK_VALUES = Object.values(Rank);
const SUIT_VALUES = Object.values(Suit);

// TODO(alex): Add JSdoc here
export const fromIndexToCard = (index: number): Card => {
  const rank = RANK_VALUES[index % 13]
  const suit = SUIT_VALUES[Math.floor(index / 13)]
  return { rank: rank, suit: suit }
}

// TODO(alex): Add JSdoc here
export const fromCardToIndex = (card: Card): number => {
  const rankIndex = RANK_VALUES.indexOf(card.rank);
  const suitIndex = SUIT_VALUES.indexOf(card.suit);
  return rankIndex + (13 * suitIndex);
}