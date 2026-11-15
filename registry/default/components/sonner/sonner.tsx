"use client";

import { Toaster as SonnerToaster } from "sonner";

function Toaster(props: React.ComponentProps<typeof SonnerToaster>) {
  return (
    <SonnerToaster
      theme="system"
      className="toast"
      toastOptions={{
        classNames: {
          toast: "bg-background border-border",
          title: "text-foreground font-medium",
          description: "text-muted-foreground text-sm",
          actionButton: "bg-primary text-primary-foreground",
          cancelButton: "bg-muted text-muted-foreground",
          error: "border-destructive text-destructive",
          success: "border-green-500 text-green-700",
          warning: "border-yellow-500 text-yellow-700",
          info: "border-blue-500 text-blue-700",
        },
      }}
      {...props}
    />
  );
}

export { Toaster as Toaster, Toaster as Sonner };
