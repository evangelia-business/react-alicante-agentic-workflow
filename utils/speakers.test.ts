import { describe, expect, it } from "vitest";

import type { Session } from "@/types/session";

import { groupSessionsBySpeaker } from "./speakers";

function session(overrides: Partial<Session> = {}): Session {
  return {
    id: "a-session",
    title: "A session",
    speaker: "A speaker",
    track: "React",
    room: "Main Hall",
    startTime: "09:00",
    durationMinutes: 45,
    description: "",
    ...overrides,
  };
}

describe("groupSessionsBySpeaker", () => {
  it("groups sessions by speaker", () => {
    const groups = groupSessionsBySpeaker([
      session({ id: "s1", speaker: "Marta Fernandez" }),
      session({ id: "s2", speaker: "Iker Otxoa" }),
      session({ id: "s3", speaker: "Marta Fernandez" }),
    ]);

    expect(groups).toEqual([
      {
        name: "Iker Otxoa",
        sessions: [expect.objectContaining({ id: "s2" })],
      },
      {
        name: "Marta Fernandez",
        sessions: [
          expect.objectContaining({ id: "s1" }),
          expect.objectContaining({ id: "s3" }),
        ],
      },
    ]);
  });

  it("sorts speakers by name", () => {
    const groups = groupSessionsBySpeaker([
      session({ speaker: "Sofia Almeida" }),
      session({ speaker: "Diego Castellanos" }),
      session({ speaker: "Pablo Iglesias" }),
    ]);

    expect(groups.map((group) => group.name)).toEqual([
      "Diego Castellanos",
      "Pablo Iglesias",
      "Sofia Almeida",
    ]);
  });

  it("keeps each speaker's sessions in the order they were given", () => {
    const groups = groupSessionsBySpeaker([
      session({ id: "later", speaker: "Marta Fernandez", startTime: "14:00" }),
      session({
        id: "earlier",
        speaker: "Marta Fernandez",
        startTime: "09:00",
      }),
    ]);

    expect(groups[0].sessions.map((s) => s.id)).toEqual(["later", "earlier"]);
  });

  it("excludes the closing panel's placeholder speaker", () => {
    const groups = groupSessionsBySpeaker([
      session({ speaker: "Full speaker lineup" }),
      session({ speaker: "Marta Fernandez" }),
    ]);

    expect(groups).toEqual([
      { name: "Marta Fernandez", sessions: expect.any(Array) },
    ]);
  });

  it("returns nothing for no sessions", () => {
    expect(groupSessionsBySpeaker([])).toEqual([]);
  });
});
