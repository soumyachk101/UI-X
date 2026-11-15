import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OTPInput } from "../otp-input";

describe("OTPInput", () => {
  it("renders correct number of inputs", () => {
    render(<OTPInput length={4} />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toBe(4);
  });

  it("auto-advances on input", async () => {
    const user = userEvent.setup();
    render(<OTPInput length={4} />);
    const inputs = screen.getAllByRole("textbox");
    await user.type(inputs[0], "1");
    expect(inputs[1]).toHaveFocus();
  });

  it("reports value via onValueChange", async () => {
    const user = userEvent.setup();
    let captured = "";
    render(
      <OTPInput
        length={4}
        onValueChange={(v) => {
          captured = v;
        }}
      />
    );
    const inputs = screen.getAllByRole("textbox");
    await user.type(inputs[0], "1");
    await user.type(inputs[1], "2");
    expect(captured).toBe("12");
  });

  it("wraps focus back on backspace", async () => {
    const user = userEvent.setup();
    render(<OTPInput length={4} value="12" />);
    const inputs = screen.getAllByRole("textbox");
    inputs[2].focus();
    await user.type(inputs[2], "{backspace}");
    expect(inputs[1]).toHaveFocus();
  });
});
