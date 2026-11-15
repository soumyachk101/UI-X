"use client";

import { Progress } from "@/components/ui/progress";

export function ProgressDemo() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 10));
    }, 500);
    return () => clearInterval(timer);
  }, []);

  return <Progress value={progress} className="w-full" />;
}
