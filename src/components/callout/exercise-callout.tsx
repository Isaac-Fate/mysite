import { cn } from "@/lib/utils";
import { Callout } from "./callout";
import { CalloutHeader } from "./callout-header";
import { CalloutContent } from "./callout-content";
import type { ReactNode } from "react";

interface ExerciseCalloutProps {
  className?: string;
  children?: ReactNode;
}

export function ExerciseCallout(props: ExerciseCalloutProps) {
  return (
    <Callout className={cn("border-l-teal-500", props.className)}>
      <CalloutHeader className="bg-teal-600" icon="✍️" title="Exercise" />
      <CalloutContent>{props.children}</CalloutContent>
    </Callout>
  );
}
