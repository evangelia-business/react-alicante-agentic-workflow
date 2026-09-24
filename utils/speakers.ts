import type { Session } from "@/types/session";

/**
 * The closing panel's `speaker` column holds this placeholder, not a real
 * person's name (see supabase/migrations/20260917090100_seed_sessions.sql).
 * Grouping would otherwise list it as if it were a speaker.
 */
const NON_SPEAKER_LABELS = ["Full speaker lineup"];

export interface SpeakerGroup {
  name: string;
  sessions: Session[];
}

/**
 * Groups sessions by speaker, sorted by name. Each speaker's sessions keep
 * the chronological order `fetchSessions()` already returns them in.
 */
export function groupSessionsBySpeaker(sessions: Session[]): SpeakerGroup[] {
  const bySpeaker = new Map<string, Session[]>();

  for (const session of sessions) {
    if (NON_SPEAKER_LABELS.includes(session.speaker)) continue;

    const existing = bySpeaker.get(session.speaker) ?? [];
    existing.push(session);
    bySpeaker.set(session.speaker, existing);
  }

  return Array.from(bySpeaker, ([name, speakerSessions]) => ({
    name,
    sessions: speakerSessions,
  })).sort((a, b) => a.name.localeCompare(b.name));
}
