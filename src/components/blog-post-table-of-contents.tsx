import { cn } from "@/lib/utils";
import type { MarkdownHeading } from "astro";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./ui/collapsible";

interface BlogPostTableOfContentsProps {
  className?: string;
  title?: string | null;
  headings?: MarkdownHeading[];
}

const defaultTitle = "/* On this page */";

interface SecondLevelHeading extends MarkdownHeading {
  subheadings: MarkdownHeading[];
}

export function BlogPostTableOfContents(props: BlogPostTableOfContentsProps) {
  if (!props.headings) {
    return null;
  }

  // Title
  let title = props.title;

  // Set to the default title if no title is provided
  if (title === undefined) {
    title = defaultTitle;
  }

  // We are only interested in 2nd and 3rd level headings
  const headings = props.headings.filter(
    (heading) => heading.depth === 2 || heading.depth === 3,
  );

  const secondLevelHeadings: SecondLevelHeading[] = [];

  let currentSecondLevelHeading: SecondLevelHeading | null = null;

  for (const heading of headings) {
    if (heading.depth === 2) {
      // Create a new second level heading
      const secondLevelHeading = { ...heading, subheadings: [] };

      // Collect the second level heading
      secondLevelHeadings.push(secondLevelHeading);

      // Update the current second level heading
      currentSecondLevelHeading = secondLevelHeading;
    } else if (heading.depth === 3) {
      if (currentSecondLevelHeading === null) {
        continue;
      }

      // Add the level 3 heading to the current second level heading
      currentSecondLevelHeading.subheadings.push(heading);
    }
  }

  return (
    <div className={cn("not-prose flex flex-col gap-2 py-4", props.className)}>
      {/* Title */}
      {title && <p className="px-4 text-code-comment">{title}</p>}

      {/* Headings */}
      <div className="flex flex-col gap-2">
        {secondLevelHeadings.map((secondLevelHeading) => {
          return (
            <SecondLevelHeadingView
              key={secondLevelHeading.slug}
              heading={secondLevelHeading}
            />
          );
        })}
      </div>
    </div>
  );
}

interface SecondLevelHeadingViewProps {
  heading: SecondLevelHeading;
}

function SecondLevelHeadingView(props: SecondLevelHeadingViewProps) {
  const noSubheadings = props.heading.subheadings.length === 0;

  return (
    <Collapsible className="">
      <div className="flex flex-row">
        <CollapsibleTrigger
          className={cn("justify-begin group flex flex-row", {
            "hover:cursor-pointer": !noSubheadings,
          })}
          disabled={noSubheadings}
        >
          <span
            className={cn(
              "not-prose mt-[0.2rem] h-4 w-4 text-muted-foreground group-[&[data-state=closed]]:icon-[material-symbols-light--keyboard-arrow-right] group-[&[data-state=open]]:icon-[material-symbols-light--keyboard-arrow-down]",
              {
                invisible: noSubheadings,
              },
            )}
          ></span>

          {/* Section symbol  */}
          <span className="text-code-keyword-declaration">§</span>
          <span>&nbsp;</span>
        </CollapsibleTrigger>

        {/* Title */}
        <a className="group flex flex-row" href={`#${props.heading.slug}`}>
          <span className="transition-transform duration-300 ease-in-out group-hover:translate-x-2 group-hover:text-code-constant">
            {props.heading.text}
          </span>
        </a>
      </div>

      <CollapsibleContent className="ml-[0.5rem] flex flex-col gap-1 border-l-2 pl-6">
        {props.heading.subheadings.map((thirdLevelHeading, index) => {
          return (
            <ThirdLevelHeadingView key={index} heading={thirdLevelHeading} />
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
}

interface ThirdLevelHeadingViewProps {
  heading: MarkdownHeading;
}

function ThirdLevelHeadingView(props: ThirdLevelHeadingViewProps) {
  return (
    <a className="group text-sm" href={`#${props.heading.slug}`}>
      <span className="text-code-keyword-declaration">§</span>
      <span>&nbsp;</span>
      <span className="transition-transform delay-1000 duration-300 ease-in-out group-hover:translate-x-2 group-hover:scale-110 group-hover:text-code-constant">
        {props.heading.text}
      </span>
    </a>
  );
}
