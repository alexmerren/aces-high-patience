export const Rank = {
    ACE: "ACE",
    TWO: "TWO",
    THREE: "THREE",
    FOUR: "FOUR",
    FIVE: "FIVE",
    SIX: "SIX",
    SEVEN: "SEVEN",
    EIGHT: "EIGHT",
    NINE: "NINE",
    TEN: "TEN",
    JACK: "JACK",
    QUEEN: "QUEEN",
    KING: "KING",
} as const;

export type Rank = typeof Rank[keyof typeof Rank];

export const Suit = {
    SPADES: "SPADES",
    HEARTS: "HEARTS",
    DIAMONDS: "DIAMONDS",
    CLUBS: "CLUBS"
} as const;

export type Suit = typeof Suit[keyof typeof Suit];

export type Card = {
    rank: Rank;
    suit: Suit;
}

export type Deck = Card[];