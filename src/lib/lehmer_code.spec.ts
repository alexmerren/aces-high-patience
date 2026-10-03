import { describe, expect, test } from "vitest";
import { encodeLehmerCode, decodeLehmerCode } from "./lehmer_code";
import { createOrderedDeck } from "./deck_util";

describe('lehmer_code', () => {
    test('encoding and decoding deck words correctly', () => {
        // given
        const reversedDeck = createOrderedDeck().reverse();

        // when
        const encodedDeck = encodeLehmerCode(reversedDeck);
        const decodedDeck = decodeLehmerCode(encodedDeck);

        // then
        expect(decodedDeck.every((card, index) =>
            card.rank === reversedDeck[index].rank && card.suit === reversedDeck[index].suit
        )).toBe(true);
    })
});