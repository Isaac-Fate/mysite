import { cn } from "@/lib/utils";
import { LogoIcon } from "./logo-icon";

interface LogoProps {
  className?: string;
}

export function Logo(props: LogoProps) {
  return (
    <a
      className={cn("text-md flex flex-row text-code-class", props.className)}
      href="/"
    >
      {/* Icon */}
      <LogoIcon className="" withName></LogoIcon>
    </a>
  );
}
