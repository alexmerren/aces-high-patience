import { describe, test, expect } from "vitest";
import { Rank, Suit } from "../types";
import { fromCardToIndex, fromIndexToCard } from "./card_util";

const TEST_DATA = [
  { card: { rank: Rank.ACE, suit: Suit.SPADES }, index: 0, },
  { card: { rank: Rank.TWO, suit: Suit.SPADES }, index: 1, },
  { card: { rank: Rank.THREE, suit: Suit.SPADES }, index: 2, },
  { card: { rank: Rank.FOUR, suit: Suit.SPADES }, index: 3, },
  { card: { rank: Rank.FIVE, suit: Suit.SPADES }, index: 4, },
  { card: { rank: Rank.SIX, suit: Suit.SPADES }, index: 5, },
  { card: { rank: Rank.SEVEN, suit: Suit.SPADES }, index: 6, },
  { card: { rank: Rank.EIGHT, suit: Suit.SPADES }, index: 7, },
  { card: { rank: Rank.NINE, suit: Suit.SPADES }, index: 8, },
  { card: { rank: Rank.TEN, suit: Suit.SPADES }, index: 9, },
  { card: { rank: Rank.JACK, suit: Suit.SPADES }, index: 10, },
  { card: { rank: Rank.QUEEN, suit: Suit.SPADES }, index: 11, },
  { card: { rank: Rank.KING, suit: Suit.SPADES }, index: 12, },
  { card: { rank: Rank.ACE, suit: Suit.HEARTS }, index: 13, },
  { card: { rank: Rank.TWO, suit: Suit.HEARTS }, index: 14, },
  { card: { rank: Rank.THREE, suit: Suit.HEARTS }, index: 15, },
  { card: { rank: Rank.FOUR, suit: Suit.HEARTS }, index: 16, },
  { card: { rank: Rank.FIVE, suit: Suit.HEARTS }, index: 17, },
  { card: { rank: Rank.SIX, suit: Suit.HEARTS }, index: 18, },
  { card: { rank: Rank.SEVEN, suit: Suit.HEARTS }, index: 19, },
  { card: { rank: Rank.EIGHT, suit: Suit.HEARTS }, index: 20, },
  { card: { rank: Rank.NINE, suit: Suit.HEARTS }, index: 21, },
  { card: { rank: Rank.TEN, suit: Suit.HEARTS }, index: 22, },
  { card: { rank: Rank.JACK, suit: Suit.HEARTS }, index: 23, },
  { card: { rank: Rank.QUEEN, suit: Suit.HEARTS }, index: 24, },
  { card: { rank: Rank.KING, suit: Suit.HEARTS }, index: 25, },
  { card: { rank: Rank.ACE, suit: Suit.DIAMONDS }, index: 26, },
  { card: { rank: Rank.TWO, suit: Suit.DIAMONDS }, index: 27, },
  { card: { rank: Rank.THREE, suit: Suit.DIAMONDS }, index: 28, },
  { card: { rank: Rank.FOUR, suit: Suit.DIAMONDS }, index: 29, },
  { card: { rank: Rank.FIVE, suit: Suit.DIAMONDS }, index: 30, },
  { card: { rank: Rank.SIX, suit: Suit.DIAMONDS }, index: 31, },
  { card: { rank: Rank.SEVEN, suit: Suit.DIAMONDS }, index: 32, },
  { card: { rank: Rank.EIGHT, suit: Suit.DIAMONDS }, index: 33, },
  { card: { rank: Rank.NINE, suit: Suit.DIAMONDS }, index: 34, },
  { card: { rank: Rank.TEN, suit: Suit.DIAMONDS }, index: 35, },
  { card: { rank: Rank.JACK, suit: Suit.DIAMONDS }, index: 36, },
  { card: { rank: Rank.QUEEN, suit: Suit.DIAMONDS }, index: 37, },
  { card: { rank: Rank.KING, suit: Suit.DIAMONDS }, index: 38, },
  { card: { rank: Rank.ACE, suit: Suit.CLUBS }, index: 39, },
  { card: { rank: Rank.TWO, suit: Suit.CLUBS }, index: 40, },
  { card: { rank: Rank.THREE, suit: Suit.CLUBS }, index: 41, },
  { card: { rank: Rank.FOUR, suit: Suit.CLUBS }, index: 42, },
  { card: { rank: Rank.FIVE, suit: Suit.CLUBS }, index: 43, },
  { card: { rank: Rank.SIX, suit: Suit.CLUBS }, index: 44, },
  { card: { rank: Rank.SEVEN, suit: Suit.CLUBS }, index: 45, },
  { card: { rank: Rank.EIGHT, suit: Suit.CLUBS }, index: 46, },
  { card: { rank: Rank.NINE, suit: Suit.CLUBS }, index: 47, },
  { card: { rank: Rank.TEN, suit: Suit.CLUBS }, index: 48, },
  { card: { rank: Rank.JACK, suit: Suit.CLUBS }, index: 49, },
  { card: { rank: Rank.QUEEN, suit: Suit.CLUBS }, index: 50, },
  { card: { rank: Rank.KING, suit: Suit.CLUBS }, index: 51, },
]

describe('card_util', () => {
  test.for(TEST_DATA)('fromCardToIndex($card) returns $index', ({ card, index }) =>
    expect(fromCardToIndex(card)).toBe(index)
  );
  test.for(TEST_DATA)('fromIndexToCard($index) returns $card', ({ card, index }) =>
    expect(fromIndexToCard(index)).toStrictEqual(card)
  );
});