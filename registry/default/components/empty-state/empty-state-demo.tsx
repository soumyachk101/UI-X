import * as React from "react";
import { InboxIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

export function EmptyStateDemo() {
  return (
    <EmptyState
      icon={<InboxIcon className="size-12" />}
      title="No items found"
      description="Get started by creating a new item."
      action={<Button>Create Item</Button>}
    />
  );
}
