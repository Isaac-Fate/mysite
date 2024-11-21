import { config } from "@/config";
import { cn } from "@/lib/utils";
import type { MarkdownHeading } from "astro";

import type { NavigationLinkConfig } from "@/models";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { BlogPostTableOfContents } from "./blog-post-table-of-contents";
import { Separator } from "./ui/separator";
import type { ReactNode } from "react";

interface SideMenuProps {
  className?: string;
  variant?: "default" | "in-margin";
  blogPostHeadings?: MarkdownHeading[];
}

export function SideMenu(props: SideMenuProps) {
  let tableOfContentsTitle: string | null | undefined = undefined;
  let menuTrigger: JSX.Element;

  switch (props.variant) {
    case "in-margin":
      tableOfContentsTitle = null;

      menuTrigger = (
        <Button variant="outline" size="icon">
          <MenuIcon className="h-6 w-6" />
        </Button>
      );
      break;

    default:
      menuTrigger = (
        <Button variant="outline" size="icon">
          <MenuIcon className="h-6 w-6" />
        </Button>
      );
  }

  return (
    <Sheet>
      <SheetTrigger className={cn("", props.className)} asChild>
        {menuTrigger}
      </SheetTrigger>

      <SheetContent className="not-prose bg-panel p-0">
        {/* Header */}
        <SheetHeader className="h-[5rem] border-b-2 bg-panel p-6">
          <SheetTitle>
            <p className="md:hidden">
              <span className="text-code-function">navigateTo</span>
              <span className="text-code-bracket-1">{"()"}</span>
            </p>

            <p className="hidden md:block">
              <span className="text-code-function">goToSection</span>
              <span className="text-code-bracket-1">{"()"}</span>
            </p>
          </SheetTitle>
        </SheetHeader>

        {/* Main content */}
        <div
          className="flex flex-col overflow-scroll bg-background"
          style={{
            height: "calc(100vh - 5rem)",
          }}
        >
          {/* Navigation links */}
          <nav className="flex w-full flex-col gap-4 p-6 md:hidden">
            {config.navigationLinkConfigs.map((navigationLinkConfig, index) => (
              <NavigationLink key={index} {...navigationLinkConfig} />
            ))}
          </nav>

          {/* Separator */}
          <Separator className="h-[2px] md:hidden" />

          {/* Table of contents for the blog post */}
          <BlogPostTableOfContents
            className="py-4"
            title={tableOfContentsTitle}
            headings={props.blogPostHeadings}
          />
        </div>
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
