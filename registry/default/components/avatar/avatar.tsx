import * as React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  fallback?: string;
}

function Avatar({ className, src, alt = "", fallback, children, ...props }: AvatarProps) {
  const [imgError, setImgError] = React.useState(false);

  return (
    <span
      className={cn(
        "relative inline-flex size-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      {src && !imgError ? (
        <img
          src={src}
          alt={alt}
          className="size-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="flex size-full items-center justify-center rounded-full bg-muted text-sm font-medium">
          {fallback || alt.slice(0, 2).toUpperCase() || "?"}
        </span>
      )}
      {children}
    </span>
  );
}

export { Avatar };
