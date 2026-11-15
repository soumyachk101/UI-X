"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface OTPInputProps {
  length?: number;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

function OTPInput({
  length = 4,
  value = "",
  onValueChange,
  className,
}: OTPInputProps) {
  const refs = React.useRef<(HTMLInputElement | null)[]>([]);

  const digits = value.split("").slice(0, length);
  while (digits.length < length) digits.push("");

  const handleChange = (index: number, input: string) => {
    const cleaned = input.replace(/\D/g, "").slice(0, 1);
    const newDigits = [...digits];
    newDigits[index] = cleaned;
    const newValue = newDigits.join("");
    onValueChange?.(newValue);

    if (cleaned && index < length - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            refs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[index]}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          aria-label={`Digit ${index + 1} of ${length}`}
          className={cn(
            "size-12 shrink-0 rounded-lg border border-input bg-background text-center text-lg font-semibold shadow-sm transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
        />
      ))}
    </div>
  );
}

OTPInput.displayName = "OTPInput";

export { OTPInput };
