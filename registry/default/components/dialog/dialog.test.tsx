import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "../dialog";

describe("Dialog", () => {
  it("renders trigger and opens dialog on click", () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>Description</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
    fireEvent.click(screen.getByText("Open"));
    expect(screen.getByText("Title")).toBeDefined();
    expect(screen.getByText("Description")).toBeDefined();
  });

  it("has role=dialog on the content", () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>
    );
    expect(screen.getByRole("dialog")).toBeDefined();
  });

  it("renders close button", () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>
    );
    expect(screen.getByLabelText("Close")).toBeDefined();
  });

  it("renders dialog title with correct text", () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogTitle>Hello World</DialogTitle>
        </DialogContent>
      </Dialog>
    );
    expect(screen.getByText("Hello World")).toBeDefined();
  });
});
