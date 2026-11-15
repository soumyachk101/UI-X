import React from "react"
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { EmptyState } from "../empty-state";

describe("EmptyState", () => {
  it("renders title and description", () => {
    render(<EmptyState title="No data" description="Nothing to show" />);
    expect(screen.getByText("No data")).toBeDefined();
    expect(screen.getByText("Nothing to show")).toBeDefined();
  });

  it("renders icon when provided", () => {
    render(
      <EmptyState title="No data" icon={<span data-testid="icon">*</span>} />
    );
    expect(screen.getByTestId("icon")).toBeDefined();
  });

  it("renders action when provided", () => {
    render(
      <EmptyState title="No data" action={<button>Action</button>} />
    );
    expect(screen.getByText("Action")).toBeDefined();
  });
});
