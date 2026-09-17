import { DEEP_A } from "./deep-a";
import { DEEP_B } from "./deep-b";
import { DEEP_C } from "./deep-c";
import type { Beat } from "./lesson-types";

export const DEEP: Record<string, Beat[]> = { ...DEEP_A, ...DEEP_B, ...DEEP_C };

export function deepFor(slug: string): Beat[] {
  return DEEP[slug] ?? [];
}
