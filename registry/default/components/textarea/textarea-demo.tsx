"use client";

import { Textarea } from "@/components/ui/textarea";

export function TextareaDemo() {
  return (
    <div className="w-full max-w-sm space-y-2">
      <Textarea placeholder="Type your message here." />
    </div>
  );
}
