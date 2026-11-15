import { Stats } from "./stats";

export function StatsDemo() {
  return (
    <Stats
      title="Key metrics"
      stats={[
        { value: "2,847", label: "Active Users", trend: { value: "+12.5%", direction: "up" } },
        { value: "$48,392", label: "Revenue", trend: { value: "+8.2%", direction: "up" } },
        { value: "1,284", label: "Conversions", trend: { value: "-2.1%", direction: "down" } },
        { value: "98.2%", label: "Uptime", trend: { value: "+0.3%", direction: "up" } },
      ]}
    />
  );
}
