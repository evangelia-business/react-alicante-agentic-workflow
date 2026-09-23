import { describe, expect, it } from "vitest";

import { render, screen } from "@/tests/utils/render";
import type { Session } from "@/types/session";

import { SpeakerCard } from "./speaker-card";

function session(overrides: Partial<Session> = {}): Session {
  return {
    id: "opening-keynote",
    title: "Opening Keynote",
    speaker: "Marta Fernandez",
    track: "React",
    room: "Main Hall",
    startTime: "09:00",
    durationMinutes: 45,
    description: "",
    ...overrides,
  };
}

describe("SpeakerCard", () => {
  it("shows the speaker's name", () => {
    render(<SpeakerCard name="Marta Fernandez" sessions={[session()]} />);

    expect(screen.getByText("Marta Fernandez")).toBeInTheDocument();
  });

  it("lists each session's title and start time", () => {
    render(
      <SpeakerCard
        name="Marta Fernandez"
        sessions={[
          session({
            id: "opening-keynote",
            title: "Opening Keynote",
            startTime: "09:00",
          }),
          session({
            id: "closing-panel",
            title: "Closing Panel",
            startTime: "16:30",
          }),
        ]}
      />,
    );

    expect(screen.getByText("Opening Keynote · 09:00")).toBeInTheDocument();
    expect(screen.getByText("Closing Panel · 16:30")).toBeInTheDocument();
  });

  it("links each session to its session page", () => {
    render(
      <SpeakerCard
        name="Marta Fernandez"
        sessions={[session({ id: "opening-keynote" })]}
      />,
    );

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/en/sessions/opening-keynote",
    );
  });

  it("names each link with the session and the speaker, for screen readers", () => {
    render(
      <SpeakerCard
        name="Marta Fernandez"
        sessions={[
          session({
            id: "opening-keynote",
            title: "Opening Keynote",
            startTime: "09:00",
          }),
        ]}
      />,
    );

    expect(
      screen.getByRole("link", {
        name: "Opening Keynote, 09:00, by Marta Fernandez",
      }),
    ).toBeInTheDocument();
  });
});
