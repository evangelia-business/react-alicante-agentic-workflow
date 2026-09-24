import { describe, expect, it, vi } from "vitest";

import { render, screen } from "@/tests/utils/render";
import type { Session } from "@/types/session";

import SessionDetailPage from "./page";

const mockSession: Session = {
  id: "opening-keynote",
  title: "Opening Keynote: The Shape of Frontend in 2026",
  speaker: "Marta Fernandez",
  track: "Architecture",
  level: "beginner",
  room: "Main Hall",
  startTime: "09:00",
  durationMinutes: 30,
  description: "Where things are headed.",
};

const { fetchSessionById } = vi.hoisted(() => ({
  fetchSessionById: vi.fn(),
}));
vi.mock("@/services/sessions", () => ({ fetchSessionById }));

const { notFound } = vi.hoisted(() => ({
  // The real notFound() throws to halt rendering; a mock that returns
  // normally would fall through to `session.track` on a null session.
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));
vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/navigation")>()),
  notFound,
}));

describe("SessionDetailPage", () => {
  it("shows the track and level as two separate badges", async () => {
    fetchSessionById.mockResolvedValue(mockSession);

    render(
      await SessionDetailPage({
        params: Promise.resolve({ id: "opening-keynote" }),
      }),
    );

    expect(screen.getByText("Architecture")).toBeInTheDocument();
    expect(screen.getByText("Beginner")).toBeInTheDocument();
  });

  it("calls notFound when the session doesn't exist", async () => {
    fetchSessionById.mockResolvedValue(null);

    await expect(
      SessionDetailPage({ params: Promise.resolve({ id: "missing" }) }),
    ).rejects.toThrow("NEXT_NOT_FOUND");

    expect(notFound).toHaveBeenCalled();
  });
});
