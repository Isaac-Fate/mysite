"use client";

import { cn } from "@/lib/utils";
import { StopwatchController } from "./controller";
import { useEffect, useState } from "react";

interface StopwatchProps {
  className?: string;
  controller: StopwatchController;
}

const maxSeconds = 60;

export function Stopwatch(props: StopwatchProps) {
  const [seconds, setSeconds] = useState(0);
  const [armRotationDegree, setArmRotationDegree] = useState(0);

  let formattedSeconds: string;
  if (seconds >= maxSeconds) {
    formattedSeconds = "--.--";
  } else {
    formattedSeconds = seconds.toFixed(2);
  }

  useEffect(() => {
    props.controller.addEventListener("reset", () => {
      setSeconds(0);
      setArmRotationDegree(0);
    });

    props.controller.addEventListener("tick", (event) => {
      const seconds = event.detail.seconds;

      if (seconds >= maxSeconds) {
        props.controller.reset();
      }

      setSeconds(seconds);

      setArmRotationDegree(
        (prevArmRotationDegree) => prevArmRotationDegree + 1,
      );
    });
  }, []);

  return (
    <div
      className={cn(
        "relative flex aspect-square w-[8rem] flex-col items-center justify-center rounded-full border-[0.2rem] border-primary/50 border-opacity-10 bg-panel p-2",
        props.className,
      )}
    >
      {/* Seconds */}
      <p className="text-3xl font-bold">{formattedSeconds}</p>

      {/* Arm */}
      <div
        className="absolute flex h-full w-2 flex-col items-center justify-start rounded-full bg-transparent"
        style={{
          rotate: `${armRotationDegree}deg`,
        }}
      >
        {/* Marker */}
        <div
          className="h-4 w-4 rounded-full border-2 bg-primary shadow-lg"
          style={{
            transform: "translateY(-50%) translateY(-0.1rem)",
          }}
        ></div>
      </div>
    </div>
  );
}
