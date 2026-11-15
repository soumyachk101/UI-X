"use client";

import * as React from "react";
import { Resizable } from "./resizable";

export default function ResizableDemo() {
  return (
    <div className="h-64 w-full rounded-lg border border-border">
      <Resizable defaultSizes={[30, 70]}>
        <div className="flex h-full items-center justify-center bg-primary/10 p-4 text-sm font-medium text-primary">
          Panel A (30%)
        </div>
        <Resizable.ResizableHandle />
        <div className="flex h-full items-center justify-center bg-accent/10 p-4 text-sm font-medium text-accent-foreground">
          Panel B (70%) — drag the divider
        </div>
      </Resizable>
    </div>
  );
}
