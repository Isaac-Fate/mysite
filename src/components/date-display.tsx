import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  date: Date;
  noIcon?: boolean;
}

export function DateDisplay(props: Props) {
  return (
    <div
      {...props}
      className={cn("flex flex-row items-center", props.className)}
    >
      {/* Icon */}
      <span className="icon-[ri--calendar-line]"></span>

      {/* Space */}
      <span>&nbsp;</span>

      {/* Date */}
      <span>{props.date.toLocaleString()}</span>
    </div>
  );
}
