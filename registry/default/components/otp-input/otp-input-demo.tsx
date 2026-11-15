"use client";

import * as React from "react";
import { OTPInput } from "./otp-input";

export default function OTPInputDemo() {
  const [value, setValue] = React.useState("");

  return (
    <div className="w-full max-w-xs">
      <label className="mb-1.5 block text-sm font-medium text-foreground">
        Enter OTP code
      </label>
      <OTPInput length={4} value={value} onValueChange={setValue} />
      {value.length === 4 && (
        <p className="mt-2 text-sm text-muted-foreground">
          Code entered: {value}
        </p>
      )}
    </div>
  );
}
