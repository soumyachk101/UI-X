import { Avatar } from "@/components/ui/avatar";

export function AvatarDemo() {
  return (
    <div className="flex gap-4">
      <Avatar src="https://github.com/shadcn.png" alt="@shadcn" />
      <Avatar alt="John Doe" fallback="JD" />
    </div>
  );
}
