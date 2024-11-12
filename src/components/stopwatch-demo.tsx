"use client";

import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { StopwatchController, Stopwatch } from "@/components/stopwatch";
import { Button } from "@/components/ui/button";

interface StopwatchDemoProps {
  className?: string;
}

export function StopwatchDemo(props: StopwatchDemoProps) {
  const stopwatchController = useMemo(() => new StopwatchController(), []);
  const [isStopwatchTicking, setIsStopwatchTicking] = useState(false);

  useEffect(() => {
    stopwatchController.addEventListener("start", () => {
      setIsStopwatchTicking(true);
    });

    stopwatchController.addEventListener("stop", () => {
      setIsStopwatchTicking(false);
    });

    stopwatchController.addEventListener("reset", () => {
      setIsStopwatchTicking(false);
    });
  });

  return (
    <div
      className={cn(
        "my-12 flex flex-col items-center justify-between gap-8",
        props.className,
      )}
    >
      {/* Stopwatch */}
      <Stopwatch
        className="h-[8rem] w-[8rem]"
        controller={stopwatchController}
      />

      {/* Controls */}
      <div className="flex flex-row gap-2">
        {/* Start/Stop button */}
        <Button
          variant={"outline"}
          onClick={() => {
            if (isStopwatchTicking) {
              stopwatchController.stop();
            } else {
              stopwatchController.start();
            }
          }}
        >
          {isStopwatchTicking ? (
            <span className={"icon-[radix-icons--pause]"}></span>
          ) : (
            <span className={"icon-[radix-icons--play]"}></span>
          )}
        </Button>

        {/* Reset button */}
        <Button
          variant={"outline"}
          onClick={() => {
            stopwatchController.reset();
          }}
        >
          <span className="icon-[radix-icons--reset]"></span>
        </Button>
      </div>
    </div>
  );
}
