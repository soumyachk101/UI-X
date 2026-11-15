"use client";

import * as React from "react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@radix-ui/react-resizable-panel";
import { cn } from "@/lib/utils";

interface ResizableProps {
  defaultSizes?: number[];
  direction?: "horizontal" | "vertical";
  className?: string;
  children: [React.ReactNode, React.ReactNode];
}

function Resizable({
  defaultSizes = [50, 50],
  direction = "horizontal",
  className,
  children,
}: ResizableProps) {
  return (
    <ResizablePanelGroup
      direction={direction}
      className={cn("w-full", className)}
    >
      <ResizablePanel defaultSize={defaultSizes[0]}>
        {children[0]}
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={defaultSizes[1]}>
        {children[1]}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export { Resizable };
