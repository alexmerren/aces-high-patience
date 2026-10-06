import { fromCardToIndex } from "../../lib/card_util";
import { Rank, type Card, type RankType } from "../../types";

const RANK_VALUES: Record<RankType, number> = {
  [Rank.TWO]: 2,
  [Rank.THREE]: 3,
  [Rank.FOUR]: 4,
  [Rank.FIVE]: 5,
  [Rank.SIX]: 6,
  [Rank.SEVEN]: 7,
  [Rank.EIGHT]: 8,
  [Rank.NINE]: 9,
  [Rank.TEN]: 10,
  [Rank.JACK]: 11,
  [Rank.QUEEN]: 12,
  [Rank.KING]: 13,
  [Rank.ACE]: 14,
};

export const isEligibleForDiscard = (
  card: Card,
  topCards: (Card | null)[]
): boolean => {
  const cardValue = RANK_VALUES[card.rank];
  return topCards.some((other) => {
    if (!other || fromCardToIndex(other) === fromCardToIndex(card)) return false;
    return (
      other.suit === card.suit && RANK_VALUES[other.rank] > cardValue
    );
  });
}
