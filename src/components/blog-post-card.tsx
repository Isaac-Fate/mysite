import {Image} from "astro:assets";
import { DateDisplay } from "./date-display";

interface Props {
  slug: string;
  title: string;
  description: string;
  createdAt: Date;
  cover: any;
}

export function BlogPostCard(props: Props) {
  return (
    <a
      className="card-landscape:flex-row card-landscape:max-h-[14rem] bg-background-deep flex w-full flex-col overflow-clip rounded-md border-2 shadow-lg transition-transform delay-150 duration-300 ease-in-out hover:-translate-y-2 hover:scale-105 hover:cursor-pointer"
      href={`/${props.slug}`}
    >
      {/* Cover image */}
      <div className="card-landscape:border-r-2 card-landscape:w-1/2 card-landscape:h-full card-landscape:border-b-0 w-full overflow-clip border-b-2">
        <Image
          src={props.cover}
          alt="Blog Post Cover"
          width={1792}
          height={1024}

        />
      </div>

      {/* Details */}
      <div className="card-landscape:w-1/2 flex flex-col gap-2 p-4">
        {/* Title */}
        <p className="w-full text-xl text-code-class md:text-2xl">
          {props.title}
        </p>

        {/* Creation date */}
        <DateDisplay
          className="text-xs text-code-string md:text-sm"
          date={props.createdAt}
        />

        {/* Description */}
        <p className="text-md card-landscape:overflow-auto text-code-variable md:text-lg">
          {props.description}
        </p>
      </div>
    </a>
  );
}
