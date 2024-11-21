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
  fontSizeCategory?: "default" | "small";
}

const defaultTitle = "/* On this page */";

interface SecondLevelHeading extends MarkdownHeading {
  subheadings: MarkdownHeading[];
}

interface HelperProps {
  secondLevelFontSize: string;
  thirdLevelFontSize: string;
}

function getHelperProps(props: BlogPostTableOfContentsProps) {}

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

  let secondLevelHeadingFontSize: string;
  let thirdLevelHeadingFontSize: string;
  let thirdLevelHeadingMarginLeft: string;

  switch (props.fontSizeCategory) {
    case "small":
      secondLevelHeadingFontSize = "0.75rem";
      thirdLevelHeadingFontSize = "0.625rem";
      thirdLevelHeadingMarginLeft = "0.35rem";
      break;

    default:
      secondLevelHeadingFontSize = "0.875rem";
      thirdLevelHeadingFontSize = "0.75rem";
      thirdLevelHeadingMarginLeft = "0.4rem";
      break;
  }

  return (
    <div className={cn("not-prose flex flex-col gap-2", props.className)}>
      {/* Title */}
      {title && (
        <p
          className="px-4 text-code-comment"
          style={{
            fontSize: secondLevelHeadingFontSize,
          }}
        >
          {title}
        </p>
      )}

      {/* Headings */}
      <div className="flex flex-col gap-2">
        {secondLevelHeadings.map((secondLevelHeading) => {
          return (
            <SecondLevelHeadingView
              key={secondLevelHeading.slug}
              heading={secondLevelHeading}
              secondLevelHeadingFontSize={secondLevelHeadingFontSize}
              thirdLevelHeadingFontSize={thirdLevelHeadingFontSize}
              thirdLevelHeadingMarginLeft={thirdLevelHeadingMarginLeft}
            />
          );
        })}
      </div>
    </div>
  );
}

interface SecondLevelHeadingViewProps {
  heading: SecondLevelHeading;
  secondLevelHeadingFontSize?: string;
  thirdLevelHeadingFontSize?: string;
  thirdLevelHeadingMarginLeft?: string;
}

function SecondLevelHeadingView(props: SecondLevelHeadingViewProps) {
  const noSubheadings = props.heading.subheadings.length === 0;

  return (
    <Collapsible className="">
      <div
        className="flex flex-row"
        style={{
          fontSize: props.secondLevelHeadingFontSize,
        }}
      >
        <CollapsibleTrigger
          className={cn("justify-begin group flex flex-row", {
            "hover:cursor-pointer": !noSubheadings,
          })}
          disabled={noSubheadings}
        >
          <span
            className={cn(
              "mt-[0.3rem] h-4 w-4 text-muted-foreground group-[&[data-state=closed]]:icon-[material-symbols-light--keyboard-arrow-right] group-[&[data-state=open]]:icon-[material-symbols-light--keyboard-arrow-down]",
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

      <CollapsibleContent
        className="flex flex-col gap-1 border-l-2 pl-6"
        style={{
          marginLeft: props.thirdLevelHeadingMarginLeft,
        }}
      >
        {props.heading.subheadings.map((thirdLevelHeading, index) => {
          return (
            <ThirdLevelHeadingView
              key={index}
              heading={thirdLevelHeading}
              fontSize={props.thirdLevelHeadingFontSize}
            />
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
}

interface ThirdLevelHeadingViewProps {
  heading: MarkdownHeading;
  fontSize?: string;
}

function ThirdLevelHeadingView(props: ThirdLevelHeadingViewProps) {
  return (
    <a
      className="group"
      href={`#${props.heading.slug}`}
      style={{ fontSize: props.fontSize }}
    >
      <span className="text-code-keyword-declaration">§</span>
      <span>&nbsp;</span>
      <span className="transition-transform delay-1000 duration-300 ease-in-out group-hover:translate-x-2 group-hover:scale-110 group-hover:text-code-constant">
        {props.heading.text}
      </span>
    </a>
  );
}
