import { Rank, Suit, type Card, type Deck } from "../types";

const RANK_VALUES = Object.values(Rank);
const SUIT_VALUES = Object.values(Suit);

// TODO(alex): Add JSdoc here
export const fromIndexToCard = (index: number): Card => {
    const rank = RANK_VALUES[index % 13]
    const suit = SUIT_VALUES[Math.floor(index / 13)]
    return { rank: rank, suit: suit }
}

// TODO(alex): Add JSdoc here
export const fromIndicesToDeck = (indices: number[]): Deck => {
    return indices.map((index) => fromIndexToCard(index))
}

// TODO(alex): Add JSdoc here
export const fromCardToIndex = (card: Card): number => {
    const rankIndex = RANK_VALUES.indexOf(card.rank);
    const suitIndex = SUIT_VALUES.indexOf(card.suit);
    return rankIndex + (13 * suitIndex);
}

// TODO(alex): Add JSdoc here
export const fromDeckToIndices = (deck: Deck): number[] => {
    return deck.map((card) => fromCardToIndex(card))
}

// TODO(alex): Add JSdoc here
export const createOrderedDeck = (): Deck => {
    const array = Array.from({ length: 52 }, (_, i) => i);
    return fromIndicesToDeck(array);
}

// TODO(alex): Add JSdoc here
export const createShuffledDeck = (): Deck => {
    const array = Array.from({ length: 52 }, (_, i) => i);
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return fromIndicesToDeck(array);
}
