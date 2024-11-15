import type { NavigationLinkConfig } from "@/models";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";

import { config } from "@/config";
import { cn } from "@/lib/utils";

interface SideMenuProps {
  className?: string;
}

export function SideMenu(props: SideMenuProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size={"icon"}>
          <MenuIcon className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent className="bg-panel p-0">
        <SheetHeader className="border-b-2 bg-panel p-6">
          <SheetTitle>
            <span className="text-code-function">navigateTo</span>
            <span className="text-code-bracket-1">{"()"}</span>
          </SheetTitle>
          {/* <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription> */}
        </SheetHeader>

        {/* Main content */}

        {/* Navigation links */}
        <nav className="flex h-full w-full flex-col gap-4 bg-background p-6">
          {config.navigationLinkConfigs.map((navigationLinkConfig, index) => (
            <NavigationLink key={index} {...navigationLinkConfig} />
          ))}
        </nav>

        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}

function NavigationLink(props: NavigationLinkConfig) {
  // Get the current pathname
  const pathname = window.location.pathname;

  // Determine if the navigation link is active
  let isActive = false;
  if (props.isActive === true) {
    isActive = true;
  } else if (typeof props.isActive === "function") {
    // Determine using the provided function
    isActive = props.isActive(props.href, pathname);
  } else if (!props.href) {
    isActive = false;
  } else {
    // Remove the possible trailing slashes

    let modifiedHref = props.href;
    if (modifiedHref.endsWith("/")) {
      modifiedHref = props.href.slice(0, -1);
    }

    let modifiedPathname = pathname;
    if (modifiedPathname.endsWith("/")) {
      modifiedPathname = modifiedPathname.slice(0, -1);
    }

    // It is active if the href matches the current path
    isActive = modifiedHref === modifiedPathname;
  }

  return (
    <a
      className={cn("text-lg font-bold", {
        "text-code-class": isActive,
      })}
      href={props.href}
      key={props.href}
    >
      <span className="text-code-tag">{"<"}</span>
      <span>{props.title}</span>
      <span className="text-code-tag">{"/>"}</span>
    </a>
  );
}
