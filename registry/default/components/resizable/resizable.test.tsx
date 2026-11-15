import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Resizable } from "../resizable";

describe("Resizable", () => {
  it("renders two panels", () => {
    render(
      <Resizable>
        <div>Left</div>
        <div>Right</div>
      </Resizable>
    );
    expect(screen.getByText("Left")).toBeTruthy();
    expect(screen.getByText("Right")).toBeTruthy();
  });

  it("renders default sizes via panel content", () => {
    render(
      <Resizable defaultSizes={[25, 75]}>
        <div>First</div>
        <div>Second</div>
      </Resizable>
    );
    expect(screen.getByText("First")).toBeTruthy();
    expect(screen.getByText("Second")).toBeTruthy();
  });

  it("renders a divider handle", () => {
    render(
      <Resizable>
        <div>A</div>
        <div>B</div>
      </Resizable>
    );
    const handle = document.querySelector("[data-resize-handle]");
    expect(handle).toBeTruthy();
  });
});
