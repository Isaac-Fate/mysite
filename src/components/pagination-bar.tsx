import { cn } from "@/lib/utils";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/my-pagination";

interface PaginationBarProps {
  className?: string;
  numPages: number;
  activePageNumber: number;
  isDummy?: boolean;
  pageNumberToLink?: (pageNumber: number) => string;
  onClickPaginationLink?: (pageNumber: number) => void;
  onClickPreviousPage?: (pageNumber: number | null) => void;
  onClickNextPage?: (pageNumber: number | null) => void;
}

export function PaginationBar(props: PaginationBarProps) {
  let paginationItems: JSX.Element;

  if (props.numPages <= 7) {
    paginationItems = buildEnumeratedPaginationItems(props);
  } else if (props.activePageNumber < 5) {
    paginationItems = buildLeadingPaginationItems(props);
  } else if (props.activePageNumber <= props.numPages - 4) {
    paginationItems = buildCenteredActivePaginationItems(props);
  } else {
    paginationItems = buildTrailingPaginationItems(props);
  }

  return (
    <Pagination className={cn("", props.className)}>
      <PaginationContent className="">
        {/* Previous */}
        <PaginationItem>{buildPreviousPaginationLink(props)}</PaginationItem>

        {/* Pagination items */}
        {paginationItems}

        {/* Next */}
        <PaginationItem>{buildNextPaginationLink(props)}</PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function buildEnumeratedPaginationItems(props: PaginationBarProps) {
  // Page numberss
  const pageNumbers = Array.from(
    { length: props.numPages },
    (_, index) => index + 1,
  );

  // Number of placeholders
  const numPlaceholders = 7 - props.numPages;

  return (
    <>
      {/* Pagination items */}
      {pageNumbers.map((pageNumber, index) => {
        return (
          <PaginationItem key={index + 1}>
            {buildPaginationLink(props, pageNumber)}
          </PaginationItem>
        );
      })}

      {/* Placeholders */}
      {Array(numPlaceholders)
        .fill(null)
        .map((_, index) => {
          return (
            <PaginationItem key={index + props.numPages + 1}>
              <PaginationLink
                className="cursor-default hover:bg-transparent"
                href=""
                isDisabled
                isDummy
              />
            </PaginationItem>
          );
        })}
    </>
  );
}

function buildLeadingPaginationItems(props: PaginationBarProps) {
  return (
    <>
      {/* Leading pagination items */}
      {[1, 2, 3, 4, 5].map((pageNumber, index) => {
        return (
          <PaginationItem key={index + 1}>
            {buildPaginationLink(props, pageNumber)}
          </PaginationItem>
        );
      })}

      {/* Ellipsis */}
      <PaginationItem key={6}>
        <PaginationEllipsis />
      </PaginationItem>

      {/* Last pagination item */}
      <PaginationItem key={7}>
        {buildPaginationLink(props, props.numPages)}
      </PaginationItem>
    </>
  );
}

function buildCenteredActivePaginationItems(props: PaginationBarProps) {
  return (
    <>
      {/* First pagination item */}
      <PaginationItem key={1}>{buildPaginationLink(props, 1)}</PaginationItem>

      {/* Ellipsis */}
      <PaginationItem key={2}>
        <PaginationEllipsis />
      </PaginationItem>

      {/* Active pagination item with 2 neighbors */}
      {[
        props.activePageNumber - 1,
        props.activePageNumber,
        props.activePageNumber + 1,
      ].map((pageNumber, index) => {
        return (
          <PaginationItem key={index + 3}>
            {buildPaginationLink(props, pageNumber)}
          </PaginationItem>
        );
      })}

      {/* Ellipsis */}
      <PaginationItem key={6}>
        <PaginationEllipsis />
      </PaginationItem>

      {/* Last pagination item */}
      <PaginationItem key={7}>
        {buildPaginationLink(props, props.numPages)}
      </PaginationItem>
    </>
  );
}

function buildTrailingPaginationItems(props: PaginationBarProps) {
  return (
    <>
      {/* First pagination item */}
      <PaginationItem key={1}>{buildPaginationLink(props, 1)}</PaginationItem>

      {/* Ellipsis */}
      <PaginationItem key={2}>
        <PaginationEllipsis />
      </PaginationItem>

      {/* Trailing pagination items */}
      {[
        props.numPages - 4,
        props.numPages - 3,
        props.numPages - 2,
        props.numPages - 1,
        props.numPages,
      ].map((pageNumber, index) => {
        return (
          <PaginationItem key={index + 3}>
            {buildPaginationLink(props, pageNumber)}
          </PaginationItem>
        );
      })}
    </>
  );
}

function buildPaginationLink(props: PaginationBarProps, pageNumber: number) {
  // Check whether this is the active page
  const isActive = pageNumber === props.activePageNumber;

  // Extra properties
  const extraProps: any = {};

  // Get the callback
  const onClickPaginationLink = props.onClickPaginationLink;

  // Set the onClick property
  if (onClickPaginationLink) {
    extraProps.onClick = () => onClickPaginationLink(pageNumber);
  }

  // Build the link with callback
  // This will turn this component to a client component
  // Hence you must use this inside a client component
  return (
    <PaginationLink
      className={cn("border-code-class", {
        "text-accent-foreground": isActive,
      })}
      href={props.pageNumberToLink?.(pageNumber) ?? ""}
      isActive={isActive}
      isDummy={props.isDummy}
      {...extraProps}
    >
      {pageNumber}
    </PaginationLink>
  );
}

function buildPreviousPaginationLink(props: PaginationBarProps) {
  // Calculate the previous page number
  let previousPageNumber: number | null = props.activePageNumber - 1;

  // Link
  let link: string;

  // Set the link to an empty string if the previous page number is less than 1
  if (previousPageNumber < 1) {
    // Set the page number to null
    previousPageNumber = null;

    // Set empty link
    link = "";
  } else {
    // Get the link from the pageNumberToLink function
    link = props.pageNumberToLink?.(previousPageNumber) ?? "";
  }

  // Extra properties
  const extraProps: any = {};

  // Get the callback
  const onClickPreviousPage = props.onClickPreviousPage;

  // Set the onClick property
  if (onClickPreviousPage) {
    extraProps.onClick = () => onClickPreviousPage(previousPageNumber);
  }

  // Build the link with callback
  // This will turn this component to a client component
  // Hence you must use this inside a client component
  return (
    <PaginationPrevious
      className={cn("", {
        "cursor-default text-muted-foreground hover:bg-transparent hover:text-muted-foreground":
          previousPageNumber === null,
      })}
      href={link}
      title="Prev"
      isDisabled={previousPageNumber === null}
      isDummy={props.isDummy}
      {...extraProps}
    />
  );
}

function buildNextPaginationLink(props: PaginationBarProps) {
  // Calculate the next page number
  let nextPageNumber: number | null = props.activePageNumber + 1;

  // Link
  let link: string;

  // Return an empty string if the next page number is greater than the total number of pages
  if (nextPageNumber > props.numPages) {
    // Set the page number to null
    nextPageNumber = null;

    link = "";
  } else {
    // Get the link from the pageNumberToLink function
    link = props.pageNumberToLink?.(nextPageNumber) ?? "";
  }

  // Extra properties
  const extraProps: any = {};

  // Get the callback
  const onClickNextPage = props.onClickNextPage;

  // Set the onClick property
  if (onClickNextPage) {
    extraProps.onClick = () => onClickNextPage(nextPageNumber);
  }

  // Build the link with callback
  // This will turn this component to a client component
  // Hence you must use this inside a client component
  return (
    <PaginationNext
      className={cn("", {
        "cursor-default text-muted-foreground hover:bg-transparent hover:text-muted-foreground":
          nextPageNumber === null,
      })}
      href={link}
      title="Next"
      isDisabled={nextPageNumber === null}
      isDummy={props.isDummy}
      {...extraProps}
    />
  );
}
