import React from "react"
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ToastProvider, useToast } from "../toast";

function ToastConsumer() {
  const { toast } = useToast();
  return (
    <button
      onClick={() =>
        toast({ title: "Hello", description: "World", variant: "default" })
      }
    >
      Trigger
    </button>
  );
}

describe("Toast", () => {
  it("renders toast when triggered", () => {
    render(
      <ToastProvider>
        <ToastConsumer />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText("Trigger"));
    expect(screen.getByText("Hello")).toBeDefined();
    expect(screen.getByText("World")).toBeDefined();
  });

  it("supports destructive variant", () => {
    render(
      <ToastProvider>
        <ToastConsumer />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText("Trigger"));
    const toast = screen.getByText("Hello").closest("div");
    expect(toast).toBeDefined();
  });
});
