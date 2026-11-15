"use client";

import * as React from "react";
import { Command } from "cmdk";
import { cn } from "@/lib/utils";

const CommandRoot = React.forwardRef<
  React.ComponentRef<typeof Command>,
  React.ComponentPropsWithoutRef<typeof Command>
>(({ className, ...props }, ref) => (
  <Command
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    )}
    {...props}
  />
));
CommandRoot.displayName = "Command";

function CommandList({ className, ...props }: React.ComponentPropsWithoutRef<typeof Command.List>) {
  return (
    <Command.List
      className={cn("max-h-72 overflow-y-auto", className)}
      {...props}
    />
  );
}

function CommandInput({ className, ...props }: React.ComponentPropsWithoutRef<typeof Command.Input>) {
  return (
    <div cmdk-input-wrapper="">
      <Command.Input
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  );
}

function CommandItem({ className, ...props }: React.ComponentPropsWithoutRef<typeof Command.Item>) {
  return (
    <Command.Item
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { CommandRoot as Command, CommandList, CommandInput, CommandItem };
