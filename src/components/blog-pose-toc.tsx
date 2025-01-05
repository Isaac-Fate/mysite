"use client";

import { useEffect, useRef } from "react";

import type { MarkdownHeading } from "node_modules/astro/dist/@types/astro";

import { cn } from "@/lib/utils";

interface BlogPostTocProps {
  className?: string;
  blogPostHeadings: MarkdownHeading[];
}

export function BlogPostToc({ className, blogPostHeadings }: BlogPostTocProps) {
  const tocHeaderRef = useRef<HTMLDivElement>(null);
  const tocEntryContainerRef = useRef<HTMLDivElement>(null);

  function checkIsFistTocEntryObsured(tocEntryContainer: HTMLElement) {
    // Get the TOC header
    const tocHeader = tocHeaderRef.current;

    if (!tocHeader) {
      console.error("TOC header not found");
      return;
    }

    const isFirstTocEntryObsured = tocEntryContainer.scrollTop > 0;

    if (isFirstTocEntryObsured) {
      tocHeader.setAttribute("data-is-first-toc-entry-obscured", "true");
    } else {
      tocHeader.setAttribute("data-is-first-toc-entry-obscured", "false");
    }
  }

  useEffect(() => {
    // Get the TOC entry container
    const tocEntryContainer = tocEntryContainerRef.current;

    if (!tocEntryContainer) {
      console.error("TOC entry container not found");
      return;
    }

    // Get all TOC entries
    const tocEntries = Array.from(document.querySelectorAll(".toc-entry"));

    // Check if the first TOC entry is obscured when the page is loaded
    checkIsFistTocEntryObsured(tocEntryContainer);

    // Check if the first TOC entry is obscured whenever the TOC container is scrolled
    tocEntryContainer.addEventListener("scroll", () => {
      checkIsFistTocEntryObsured(tocEntryContainer);
    });

    // Get the container
    const container = document.querySelector("main");
    container;
    if (!container) {
      return;
    }

    // Heading elements with level 2 and 3,
    // which are associated with the sections and subsections
    const headings = Array.from(document.querySelectorAll("h2, h3"));

    // The current heading ID
    let currentHeadingId: string | null = null;

    // Keep track of the value of the last scroll top
    let lastScrollTop = 0;

    // Set up the intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        // The new current heading ID to fint
        let newCurrentHeadingId: string | null = null;

        // Heading elements that are currently intersecting
        const intersectingHeadings: HTMLHeadElement[] = [];

        // Get the current scroll top
        const currentScrollTop = container.scrollTop;

        // Calculate the delta value
        const deltaScrollTop = currentScrollTop - lastScrollTop;

        // Check if the user is scrolling up
        const isScrollingUp = deltaScrollTop < 0;

        // Update the last scroll top
        lastScrollTop = currentScrollTop;

        // Get the intersecting headings
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            (entry.target.tagName === "H2" || entry.target.tagName === "H3")
          ) {
            intersectingHeadings.push(entry.target as HTMLHeadElement);
          }
        });

        // If the intersecting headings are empty,
        // then sethe current heading ID to the ID of the fist intersecting heading
        if (intersectingHeadings.length > 0) {
          newCurrentHeadingId = intersectingHeadings[0].id;
        } else if (newCurrentHeadingId !== null && isScrollingUp) {
          // In this case, there are no intersecting headings
          // but the current heading ID is not null
          // and the user is scrolling up,
          // which means that the user is scrolling back to the previous heading

          // Find the heading before the current heading
          for (let i = 0; i < headings.length - 1; i++) {
            if (headings[i + 1].id === newCurrentHeadingId) {
              newCurrentHeadingId = headings[i].id;
              break;
            }
          }
        }

        if (
          newCurrentHeadingId === null ||
          newCurrentHeadingId === currentHeadingId
        ) {
          return;
        }

        // Update the current heading ID
        currentHeadingId = newCurrentHeadingId;

        // Debug
        console.debug(`current heading ID: ${currentHeadingId}`);

        tocEntries.forEach((tocEntry) => {
          if (tocEntry.getAttribute("data-heading-id") === currentHeadingId) {
            // Set active
            tocEntry.setAttribute("data-active", "true");

            // Scroll to the associated TOC entry into view
            tocEntry.scrollIntoView({
              block: "center",
              behavior: "smooth",
            });
          } else {
            // Set inactive
            tocEntry.setAttribute("data-active", "false");
          }
        });
      },
      {
        root: container,
      },
    );

    // Observe the heading elements
    headings.forEach((heading) => {
      observer.observe(heading);
    });
  }, []);

  return (
    <div className={cn("flex flex-col border-r-2 bg-panel", className)}>
      <p
        ref={tocHeaderRef}
        className={
          "flex h-[4rem] flex-col justify-center px-8 py-4 font-bold text-code-plain data-[is-first-toc-entry-obscured=true]:shadow-lg"
        }
      >
        ON THIS PAGE
      </p>

      {/* Entries */}
      <div
        ref={tocEntryContainerRef}
        className="flex h-[calc(100vh-4rem-4rem)] flex-col gap-2 overflow-auto px-8 pb-4"
      >
        {blogPostHeadings.map((blogPostHeading) => {
          return (
            <a
              className={cn(
                "toc-entry flex flex-row text-sm text-code-plain/60 hover:text-code-plain data-[active=true]:text-code-plain",
                {
                  "text-xs": blogPostHeading.depth === 3,
                },
              )}
              href={`#${blogPostHeading.slug}`}
              data-heading-id={blogPostHeading.slug}
            >
              <div
                className={cn("", {
                  "w-4": blogPostHeading.depth === 3,
                })}
              />

              {/* Title */}
              <p>{blogPostHeading.text}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
}
