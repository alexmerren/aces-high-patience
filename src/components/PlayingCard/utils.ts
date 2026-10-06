import { Suit, type Card, type SuitType } from "../../types";

const RED_SUITS: Set<SuitType> = new Set([Suit.HEARTS, Suit.DIAMONDS]);
export const SUIT_SYMBOLS: Record<SuitType, string> = {
    [Suit.SPADES]: "♠",
    [Suit.HEARTS]: "♥",
    [Suit.DIAMONDS]: "♦",
    [Suit.CLUBS]: "♣",
};

export const getCardColour = (card: Card) => RED_SUITS.has(card.suit) ? "text-red-600" : "text-slate-900";
export const getCardSymbol = (card: Card) => SUIT_SYMBOLS[card.suit];