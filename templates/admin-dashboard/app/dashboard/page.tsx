import DashboardSidebar from "@/app/dashboard/sidebar";

export default function DashboardPage() {
  return (
    <div className="flex h-screen">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-background p-6 shadow-sm">
            <p className="text-sm font-medium text-muted-foreground">Total Users</p>
            <p className="text-3xl font-bold mt-2">12,345</p>
          </div>
          <div className="rounded-lg border border-border bg-background p-6 shadow-sm">
            <p className="text-sm font-medium text-muted-foreground">Revenue</p>
            <p className="text-3xl font-bold mt-2">$45,231</p>
          </div>
          <div className="rounded-lg border border-border bg-background p-6 shadow-sm">
            <p className="text-sm font-medium text-muted-foreground">Active Sessions</p>
            <p className="text-3xl font-bold mt-2">1,234</p>
          </div>
          <div className="rounded-lg border border-border bg-background p-6 shadow-sm">
            <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
            <p className="text-3xl font-bold mt-2">3.24%</p>
          </div>
        </div>
      </main>
    </div>
  );
}
