import { Analytics } from "./analytics";

export function AnalyticsDemo() {
  return (
    <Analytics
      title="Dashboard Analytics"
      description="Track your key metrics and performance over time."
      stats={[
        { label: "Total Views", value: "24,532", trend: { value: "12.5%", direction: "up" } },
        { label: "Visitors", value: "8,491", trend: { value: "8.2%", direction: "up" } },
        { label: "Bounce Rate", value: "42.3%", trend: { value: "3.1%", direction: "down" } },
        { label: "Avg. Session", value: "4m 32s", trend: { value: "5.7%", direction: "up" } },
      ]}
      chartData={[
        { label: "Mon", value: 65 },
        { label: "Tue", value: 85 },
        { label: "Wed", value: 45 },
        { label: "Thu", value: 95 },
        { label: "Fri", value: 70 },
        { label: "Sat", value: 50 },
        { label: "Sun", value: 60 },
      ]}
    />
  );
}
