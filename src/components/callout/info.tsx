import { cn } from "@/lib/utils";
import { Callout } from "./callout";
import { CalloutHeader } from "./callout-header";
import { CalloutContent } from "./callout-content";
import type { ReactNode } from "react";

interface InfoProps {
  className?: string;
  children?: ReactNode;
}

export function Info(props: InfoProps) {
  return (
    <Callout className={cn("border-l-blue-800", props.className)}>
      <CalloutHeader className="bg-blue-900" icon="ℹ️" />
      <CalloutContent>{props.children}</CalloutContent>
    </Callout>
  );
}
