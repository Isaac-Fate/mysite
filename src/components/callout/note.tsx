import { cn } from "@/lib/utils";
import { Callout } from "./callout";
import { CalloutHeader } from "./callout-header";
import { CalloutContent } from "./callout-content";
import type { ReactNode } from "react";

interface NoteProps {
  className?: string;
  children?: ReactNode;
}

export function Note(props: NoteProps) {
  return (
    <Callout className={cn("border-l-cyan-500", props.className)}>
      <CalloutHeader className="bg-cyan-600" icon="📝" title="Note" />
      <CalloutContent>{props.children}</CalloutContent>
    </Callout>
  );
}
