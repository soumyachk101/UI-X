"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="option-one" id="o1" />
        <Label htmlFor="o1">Option One</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="option-two" id="o2" />
        <Label htmlFor="o2">Option Two</Label>
      </div>
    </RadioGroup>
  );
}
