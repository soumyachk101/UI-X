import { Badge } from "@/components/ui/badge";
import { StatCard } from "../stat-card/stat-card";

interface StatData {
  label: string;
  value: string;
  trend?: { value: string; direction: "up" | "down" };
}

interface BarChartData {
  label: string;
  value: number;
  max?: number;
}

interface AnalyticsProps {
  stats?: StatData[];
  chartData?: BarChartData[];
  title?: string;
  description?: string;
}

const defaultStats: StatData[] = [
  { label: "Total Views", value: "24,532", trend: { value: "12.5%", direction: "up" } },
  { label: "Visitors", value: "8,491", trend: { value: "8.2%", direction: "up" } },
  { label: "Bounce Rate", value: "42.3%", trend: { value: "3.1%", direction: "down" } },
  { label: "Avg. Session", value: "4m 32s", trend: { value: "5.7%", direction: "up" } },
];

const defaultChartData: BarChartData[] = [
  { label: "Mon", value: 65 },
  { label: "Tue", value: 85 },
  { label: "Wed", value: 45 },
  { label: "Thu", value: 95 },
  { label: "Fri", value: 70 },
  { label: "Sat", value: 50 },
  { label: "Sun", value: 60 },
];

export function Analytics({
  stats = defaultStats,
  chartData = defaultChartData,
  title = "Analytics Overview",
  description = "Track your key metrics and performance over time.",
}: AnalyticsProps) {
  const maxChartValue = chartData.length
    ? Math.max(...chartData.map((d) => d.value))
    : 100;

  return (
    <section className="py-16 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Last 7 days</Badge>
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
        <div className="mt-8 rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">
            Views per day
          </h3>
          <div className="mt-6 flex items-end gap-4">
            {chartData.map((item) => (
              <div
                key={item.label}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <div className="relative w-full">
                  <div
                    className="w-full rounded-md bg-primary"
                    style={{
                      height: `${(item.value / maxChartValue) * 180}px`,
                    }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
