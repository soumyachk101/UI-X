import { Sidebar } from "./sidebar";

export function SidebarDemo() {
  return (
    <div className="flex h-[500px] w-full rounded-lg border overflow-hidden">
      <Sidebar />
      <main className="flex-1 bg-background p-6">
        <p className="text-muted-foreground">Main content area</p>
      </main>
    </div>
  );
}
