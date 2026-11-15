import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Carousel } from "../carousel";

describe("Carousel", () => {
  const slides = [
    <div key="1">Slide 1</div>,
    <div key="2">Slide 2</div>,
    <div key="3">Slide 3</div>,
  ];

  it("renders the first slide", () => {
    render(<Carousel slides={slides} />);
    expect(screen.getByText("Slide 1")).toBeTruthy();
  });

  it("shows dot indicators", () => {
    render(<Carousel slides={slides} />);
    const buttons = screen.getAllByRole("button");
    const dotButtons = buttons.filter((btn) =>
      btn.hasAttribute("aria-label") && (btn.getAttribute("aria-label") || "").startsWith("Go to slide")
    );
    expect(dotButtons.length).toBe(3);
  });

  it("navigates to the next slide", async () => {
    const user = userEvent.setup();
    render(<Carousel slides={slides} />);
    const buttons = screen.getAllByRole("button");
    const nextBtn = buttons.find((btn) => btn.getAttribute("aria-label") === "Next slide");
    await user.click(nextBtn!);
    expect(screen.getByText("Slide 2")).toBeTruthy();
  });

  it("navigates to the previous slide", async () => {
    const user = userEvent.setup();
    render(<Carousel slides={slides} />);
    const buttons = screen.getAllByRole("button");
    const prevBtn = buttons.find((btn) => btn.getAttribute("aria-label") === "Previous slide");
    await user.click(prevBtn!);
    expect(screen.getByText("Slide 3")).toBeTruthy();
  });

  it("wraps from last slide to first", async () => {
    const user = userEvent.setup();
    render(<Carousel slides={slides} />);
    const buttons = screen.getAllByRole("button");
    const nextBtn = buttons.find((btn) => btn.getAttribute("aria-label") === "Next slide");
    await user.click(nextBtn!);
    await user.click(nextBtn!);
    await user.click(nextBtn!);
    expect(screen.getByText("Slide 1")).toBeTruthy();
  });
});
