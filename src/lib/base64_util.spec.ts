import { describe, test, expect } from 'vitest';
import { encodeBase64, decodeBase64 } from './base64_util';

describe('base64_util', () => {
  describe('round-trip encoding and decoding', () => {
    test.each([
      ['zero', 0n],
      ['single byte value', 12n],
      ['max 1-byte boundary (0xFF)', 255n],
      ['2-byte boundary (0x0100)', 256n],
      ['max 2-byte boundary (0xFFFF)', 65535n],
      ['max 64-bit unsigned int', 18446744073709551615n],
      ['large 256-bit BigInt', BigInt('0x' + 'f'.repeat(64))],
    ])('should accurately round-trip %s (%s)', (_, input) => {
      const encoded = encodeBase64(input);
      const decoded = decodeBase64(encoded);

      expect(decoded).toBe(input);
    });
  });

  describe('encodeBase64', () => {
    test('strips trailing padding (=) characters', () => {
      const encoded = encodeBase64(12n);
      expect(encoded).not.toContain('=');
    });

    test('replaces standard Base64 characters with URL-safe variants', () => {
      // 251n hex is 'fb' -> binary 0xFB -> standard Base64 contains '+'
      const encoded = encodeBase64(251n);

      expect(encoded).not.toContain('+');
      expect(encoded).not.toContain('/');
      expect(encoded).toContain('-'); // '+' is replaced with '-'
    });

    test('handles odd-length hex strings by normalizing leading zeros', () => {
      // 15n hex is 'f' (length 1), requires leading '0' padding to form byte '0f'
      const encoded = encodeBase64(15n);
      expect(decodeBase64(encoded)).toBe(15n);
    });
  });

  describe('decodeBase64', () => {
    test('decodes unpadded strings of various lengths', () => {
      // Tests modulo 4 padding restoration (0, 1, 2, 3 missing '=' chars)
      const values = [1n, 256n, 65536n, 16777216n];

      for (const val of values) {
        const encoded = encodeBase64(val);
        expect(decodeBase64(encoded)).toBe(val);
      }
    });

    test('correctly decodes strings containing URL-safe characters (- and _)', () => {
      const encoded = encodeBase64(251n); // contains '-'
      expect(decodeBase64(encoded)).toBe(251n);
    });
  });

  describe('edge cases & error handling', () => {
    test('throws error when decoding invalid base64 input', () => {
      expect(() => decodeBase64('!!!invalid_base64!!!')).toThrow();
    });

    test('throws error when decoding an empty string', () => {
      expect(() => decodeBase64('')).toThrow();
    });
  });
});