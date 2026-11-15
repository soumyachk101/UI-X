import { StatCard } from "./stat-card";

export function StatCardDemo() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Total Revenue"
        value="$45,231.89"
        trend={{ value: "20.1%", direction: "up" }}
      />
      <StatCard
        label="Subscriptions"
        value="+2350"
        trend={{ value: "180.1%", direction: "up" }}
      />
      <StatCard
        label="Sales"
        value="+12,234"
        trend={{ value: "19%", direction: "up" }}
      />
      <StatCard
        label="Active Now"
        value="+573"
        trend={{ value: "201", direction: "down" }}
      />
    </div>
  );
}
