import type { Deck } from "../types";
import { decodeBase64, encodeBase64 } from "./base64_util";
import { createShuffledDeck } from "./deck_util";
import { decodeLehmerCode, encodeLehmerCode } from "./lehmer_code";

export const createRandomCode = (): string => encodeBase64(encodeLehmerCode(createShuffledDeck()));

export const getDeckFromCode = (code: string): Deck => decodeLehmerCode(decodeBase64(code));