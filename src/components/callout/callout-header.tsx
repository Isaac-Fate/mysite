import { cn } from "@/lib/utils";

interface CalloutHeaderProps {
  className?: string;
  icon?: string;
  title?: string;
}

export function CalloutHeader(props: CalloutHeaderProps) {
  return (
    <div
      className={cn(
        "not-prose w-full bg-panel pl-2 font-bold text-white",
        props.className,
      )}
    >
      {/* Icon */}
      {props.icon && (
        <>
          <span>{props.icon}</span>
          <span>&nbsp;</span>
        </>
      )}

      {/* Title */}
      <span>{props.title}</span>
    </div>
  );
}
