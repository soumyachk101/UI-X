"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function SonnerDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() =>
          toast.success("Event created", {
            description: "Sunday, January 5th at 9:00am",
          })
        }
      >
        Show Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.error("Error", {
            description: "Something went wrong.",
          })
        }
      >
        Show Error
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.warning("Warning", {
            description: "Please review before proceeding.",
          })
        }
      >
        Show Warning
      </Button>
    </div>
  );
}
