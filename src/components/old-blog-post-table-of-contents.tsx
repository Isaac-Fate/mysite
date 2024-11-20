import { cn } from "@/lib/utils";
import type { MarkdownHeading } from "astro";

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
    <div className={cn("not-prose flex flex-col gap-2 p-4", props.className)}>
      {/* Title */}
      {title && <p className="text-code-comment">{title}</p>}

      {/* Headings */}
      <div className="flex flex-col">
        {headings.map((heading) => {
          return (
            <a
              className={cn(
                "group text-code-variable hover:text-code-constant",
                {
                  // Add indentation for subheadings
                  "ml-8": heading.depth > 2,
                },
              )}
              href={`#${heading.slug}`}
            >
              {/* Title */}
              <div className="flex flex-row gap-1">
                {/* Icon */}
                <div className="flex h-full flex-col justify-start text-code-keyword-declaration">
                  <span className="icon-[material-symbols--arrow-right] h-6 w-6" />
                </div>

                {/* Title */}
                <p className="h-full transition duration-300 group-hover:translate-x-1">
                  {heading.text}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
