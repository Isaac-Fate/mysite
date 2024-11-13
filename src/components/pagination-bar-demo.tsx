"use client";

import { cn } from "@/lib/utils";
import { PaginationBar } from "@/components/pagination-bar";
import { useState } from "react";

interface PaginationBarDemoProps {
  className?: string;
  numPages?: number;
}

export function PaginationBarDemo(props: PaginationBarDemoProps) {
  const numPages = props.numPages ?? 1;
  const [activePageNumber, setActivePageNumber] = useState(1);

  return (
    <PaginationBar
      className={cn("not-prose", props.className)}
      numPages={numPages}
      activePageNumber={activePageNumber}
      isDummy
      onClickPaginationLink={(pageNumber) => {
        setActivePageNumber(pageNumber);
      }}
      onClickPreviousPage={(pageNumber) => {
        if (pageNumber === null) return;
        setActivePageNumber(pageNumber);
      }}
      onClickNextPage={(pageNumber) => {
        if (pageNumber === null) return;
        setActivePageNumber(pageNumber);
      }}
    />
  );
}
