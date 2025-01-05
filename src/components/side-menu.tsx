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
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { BlogPostToc } from "@/components/blog-pose-toc";

interface SideMenuProps {
  className?: string;
  blogPostHeadings?: MarkdownHeading[];
}

export function SideMenu({ className, blogPostHeadings }: SideMenuProps) {
  return (
    <Sheet>
      <SheetTrigger className={cn("", className)} asChild>
        <Button variant="outline" size="icon">
          <MenuIcon className="h-6 w-6" />
        </Button>
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

          {/* Table of contents for the blog post */}
          {blogPostHeadings && (
            <BlogPostToc
              className="bg-inherit"
              blogPostHeadings={blogPostHeadings}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function NavigationLink({ isActive, href, title }: NavigationLinkConfig) {
  // Get the current pathname
  const pathname = window.location.pathname;

  // Determine if the navigation link is active
  let resolvedIsActive = false;
  if (isActive === true) {
    resolvedIsActive = true;
  } else if (typeof isActive === "function") {
    // Determine using the provided function
    resolvedIsActive = isActive(href, pathname);
  } else if (!href) {
    resolvedIsActive = false;
  } else {
    // Remove the possible trailing slashes

    let modifiedHref = href;
    if (modifiedHref.endsWith("/")) {
      modifiedHref = href.slice(0, -1);
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
      href={href}
      key={href}
    >
      <span className="text-code-tag">{"<"}</span>
      <span>{title}</span>
      <span className="text-code-tag">{"/>"}</span>
    </a>
  );
}
