import { cn } from "@/lib/utils";

interface OverlayProps {
  className?: string;
  children?: React.ReactNode;
}

export function Overlay(props: OverlayProps) {
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-center justify-center bg-overlay",
        props.className,
      )}
      onClick={() => {
        console.log("click");
      }}
    >
      {props.children}
    </div>
  );
}
