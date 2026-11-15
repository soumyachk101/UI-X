"use client";

import * as React from "react";
import { CommandPalette, type CommandPaletteItem } from "./command-palette";

const items: CommandPaletteItem[] = [
  { id: "1", label: "Go to Dashboard", group: "Navigation", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 6a2.25 2.25 0 0 1 2.25-2.25h2.25A2.25 2.25 0 0 1 21.75 6v2.25a2.25 2.25 0 0 1-2.25 2.25H17.25a2.25 2.25 0 0 1-2.25-2.25V6Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 15.75a2.25 2.25 0 0 1 2.25-2.25h2.25A2.25 2.25 0 0 1 21.75 15.75V18a2.25 2.25 0 0 1-2.25 2.25H17.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" /></svg> },
  { id: "2", label: "Open Settings", group: "Navigation" },
  { id: "3", label: "New Project", group: "Actions", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg> },
  { id: "4", label: "Invite Team Member", group: "Actions" },
  { id: "5", label: "Toggle Dark Mode", group: "Preferences", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" /></svg> },
];

export default function CommandPaletteDemo() {
  return (
    <div className="w-full max-w-2xl">
      <p className="text-sm text-muted-foreground">
        Press{" "}
        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs">
          Ctrl K
        </kbd>{" "}
        to open the command palette.
      </p>
      <CommandPalette items={items} />
    </div>
  );
}
