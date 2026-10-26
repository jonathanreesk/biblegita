export const REF_RE: () => RegExp;
export const BARE_RE: () => RegExp;
export function keyFromMatch(m: RegExpMatchArray): string;
export function keyFromBare(m: RegExpMatchArray): string;
export function parseKey(k: string): { book: string; chapter: number; from: number; to: number } | null;
export const HINDU_RE: () => RegExp;
export function keyFromHindu(m: RegExpMatchArray): string;
export function refKeyFor(text: string, known?: Record<string, unknown>): string | null;
