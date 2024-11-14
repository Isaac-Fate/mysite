"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface SearchButtonProps {
  className?: string;
  onSearch?: () => void;
}

const hotkey = "/";

export function SearchButton(props: SearchButtonProps) {
  const [isHotkeyDown, setIsHotkeyDown] = useState(false);

  function navigateToSearchPage() {
    window.location.href = "/search";
  }

  function hanldeKeyDown(event: KeyboardEvent) {
    if (event.key === hotkey && !isHotkeyDown) {
      setIsHotkeyDown(true);
    }
  }

  function hanldeKeyUp(event: KeyboardEvent) {
    if (event.key === hotkey) {
      setIsHotkeyDown(false);

      // Invoke tha callback
      navigateToSearchPage();
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", hanldeKeyDown);
    window.addEventListener("keyup", hanldeKeyUp);

    return () => {
      window.removeEventListener("keydown", hanldeKeyDown);
      window.removeEventListener("keyup", hanldeKeyUp);
    };
  }, []);

  return (
    <div
      className={cn(
        "relative flex flex-row rounded-md border-2 px-[2rem] py-2 hover:cursor-pointer",
        props.className,
      )}
      onClick={() => {
        // navigateToSearchPage();
        props.onSearch?.();
      }}
    >
      {/* Search icon */}
      <div className="flex -translate-x-[1rem] flex-col justify-center p-0 text-code-class">
        <span className="icon-[my--search]"></span>
      </div>

      {/* Text */}
      <p>Search</p>

      {/* Slash key icon */}
      <div
        className={cn(
          "flex h-full translate-x-[1rem] flex-col justify-center text-code-class duration-300",
          { "scale-150": isHotkeyDown },
        )}
      >
        <span className="icon-[solar--slash-square-linear]"></span>
      </div>
    </div>
  );
}
