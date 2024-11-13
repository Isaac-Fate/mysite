import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface CalloutContentProps {
  className?: string;
  children?: ReactNode;
}

export function CalloutContent(props: CalloutContentProps) {
  return <div className={cn("px-2", props.className)}>{props.children}</div>;
}
