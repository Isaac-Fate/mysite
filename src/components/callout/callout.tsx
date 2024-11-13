import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface CalloutProps {
  className?: string;
  children?: ReactNode;
}

export function Callout(props: CalloutProps) {
  return (
    <div
      className={cn(
        "my-5 flex flex-col overflow-clip rounded-md border-l-2 shadow-lg",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}
