import { describe, expect, test } from "vitest";
import { createOrderedDeck, createShuffledDeck } from "./deck_util";
import type { Deck, RankType, SuitType } from "../types";

describe('deck_util', () => {
  test('createOrderedDeck returns successfully', () => {
    // when
    const result = createOrderedDeck();

    // then
    assertDeckIsComplete(result);
  });

  test('createShuffledDeck returns successfully', () => {
    // when
    const result = createShuffledDeck();

    // then
    assertDeckIsComplete(result);
  });
});

const assertDeckIsComplete = (deck: Deck) => {
  const suitFrequency = deck.reduce((accumulator, currentValue) => {
    accumulator[currentValue.suit] = (accumulator[currentValue.suit] || 0) + 1
    return accumulator;
  }, {} as Record<SuitType, number>);

  const rankFrequency = deck.reduce((accumulator, currentValue) => {
    accumulator[currentValue.rank] = (accumulator[currentValue.rank] || 0) + 1
    return accumulator;
  }, {} as Record<RankType, number>);

  expect.soft(deck.length).toBe(52);
  expect.soft(Object.values(suitFrequency).every((value) => value === 13)).toBe(true)
  expect.soft(Object.values(rankFrequency).every((value) => value === 4)).toBe(true)
}