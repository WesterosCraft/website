import * as React from "react";

import { matchSorter } from "match-sorter";
// import type { Item as NormalItem } from "nextra/normalize-pages";
import type { ReactElement } from "react";
import { useMemo, useState } from "react";
// import type { SearchResult } from "../types";
import { HighlightMatches } from "./highlight-matches";
import { Search } from "./search";

export type Item = {
  title: string;
  type: string;
  children?: Item[];
  // display?: Display
  // withIndexPage?: boolean
  // theme?: PageTheme
  // isUnderCurrentDocsTree?: boolean
};

export function MatchSorterSearch({
  className,
  directories,
}: {
  className?: string;
  directories: any[];
  //    NormalItem[]
}): ReactElement {
  const [search, setSearch] = useState("");
  const results = useMemo<
    any[]
    //   SearchResult[]
  >(
    () =>
      // Will need to scrape all the headers from each page and search through them here
      // (similar to what we already do to render the hash links in sidebar)
      // We could also try to search the entire string text from each page
      search
        ? matchSorter(directories, search, { keys: ["title"] }).map(
            ({ route, title }) => ({
              id: route + title,
              route,
              children: <HighlightMatches value={title} match={search} />,
            })
          )
        : [],
    [search, directories]
  );

  return (
    <Search
      value={search}
      onChange={setSearch}
      className={className}
      overlayClassName='w-full'
      results={results}
    />
  );
}
