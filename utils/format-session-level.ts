import type { Level } from "@/types/session";

/** The enum stores lowercase values ("beginner"); the UI shows them capitalized. */
export function formatSessionLevel(level: Level): string {
  return level.charAt(0).toUpperCase() + level.slice(1);
}
