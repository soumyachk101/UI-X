import React from "react"
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Command, CommandList, CommandInput, CommandItem } from "../command";

describe("Command", () => {
  it("renders command input and list", () => {
    render(
      <Command>
        <CommandInput placeholder="Search..." data-testid="cmd-input" />
        <CommandList>
          <CommandItem value="item1">Item 1</CommandItem>
          <CommandItem value="item2">Item 2</CommandItem>
        </CommandList>
      </Command>
    );
    expect(screen.getByTestId("cmd-input")).toBeDefined();
    expect(screen.getByText("Item 1")).toBeDefined();
    expect(screen.getByText("Item 2")).toBeDefined();
  });

  it("renders items with correct value", () => {
    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandItem value="framework" data-testid="item-framework">
            Framework
          </CommandItem>
        </CommandList>
      </Command>
    );
    const item = screen.getByTestId("item-framework");
    expect(item.getAttribute("data-value")).toBe("framework");
  });

  it("filters items via input", () => {
    render(
      <Command>
        <CommandInput placeholder="Search..." data-testid="cmd-input" />
        <CommandList>
          <CommandItem value="apple">Apple</CommandItem>
          <CommandItem value="banana">Banana</CommandItem>
        </CommandList>
      </Command>
    );
    const input = screen.getByTestId("cmd-input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "app" } });
    expect(screen.getByText("Apple")).toBeDefined();
  });
});
