// TODO(alex): Add JSdoc here
export const encodeBase64 = (input: bigint): string => {
  const hex = input.toString(16);
  const normalizedHex = hex.length % 2 !== 0 ? '0' + hex : hex;
  const byteCount = normalizedHex.length / 2;
  const charCodes = new Uint8Array(byteCount);

  for (let i = 0; i < byteCount; i++) {
    charCodes[i] = parseInt(normalizedHex.substring(i * 2, i * 2 + 2), 16);
  }

  const binaryString = String.fromCharCode(...charCodes);

  return btoa(binaryString)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

// TODO(alex): Add JSdoc here
export const decodeBase64 = (input: string): bigint => {
  const paddingLength = (4 - (input.length % 4)) % 4;
  const standardBase64 = input.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat(paddingLength);
  const binaryString = atob(standardBase64);
  const hexSegments = new Array<string>(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    hexSegments[i] = binaryString.charCodeAt(i).toString(16).padStart(2, '0');
  }

  return BigInt('0x' + hexSegments.join(''));
};