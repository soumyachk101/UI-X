import React from "react"
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Alert, AlertTitle, AlertDescription } from "../alert";

describe("Alert", () => {
  it("renders with default variant", () => {
    render(
      <Alert>
        <AlertTitle>Title</AlertTitle>
        <AlertDescription>Description</AlertDescription>
      </Alert>
    );
    const el = screen.getByRole("alert");
    expect(el).toBeDefined();
    expect(el.className).toContain("border-border");
  });

  it("applies destructive variant", () => {
    render(
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong.</AlertDescription>
      </Alert>
    );
    const el = screen.getByRole("alert");
    expect(el.className).toContain("text-destructive");
  });

  it("renders title and description", () => {
    render(
      <Alert>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>Description text</AlertDescription>
      </Alert>
    );
    expect(screen.getByText("Heads up")).toBeDefined();
    expect(screen.getByText("Description text")).toBeDefined();
  });
});
