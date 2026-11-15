"use client";

import { Input } from "@/components/ui/input";

export function InputDemo() {
  return (
    <div className="w-full max-w-sm space-y-2">
      <Input placeholder="Enter your email" type="email" />
    </div>
  );
}
