import { describe, expect, test } from "vitest";
import { decodeBase64, encodeBase64 } from "./base64_util";

// TODO(alex): Given that this is entirely custom we need to write tests to cover all edge and corner cases
describe('base64_util', () => {
    test('encoding and decoding deck works correctly', () => {
        // given
        const randomNumber = 12n;

        // when
        const encodedBase64 = encodeBase64(randomNumber);
        console.log(encodedBase64);
        const decodedNumber = decodeBase64(encodedBase64);
        console.log(decodedNumber);

        // then
        expect(decodedNumber).toBe(randomNumber);
    });
});