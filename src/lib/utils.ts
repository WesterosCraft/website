/* eslint-disable no-useless-escape */
import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import slgfy from "slugify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function camelize(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

export function titleizeASlug(slug: string) {
  if (!slug) return slug;
  const words = slug?.split("-");
  return words
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
    })
    .join(" ");
}

export function camel2title(camelCase: string) {
  return camelCase
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase())
    .trim();
}

export const slugify = (string: string): string => {
  return string
    .normalize("NFKD") // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of a string (optional)
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\_/g, "-") // Replace _ with -
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/\-$/g, ""); // Remove trailing -
};

export const makeDocsWikiNav = (docs: any[]) => {
  const categories: any = {};

  docs.forEach((doc) => {
    const category = camel2title(doc.data.docCategory);

    if (!categories[category]) {
      categories[category] = [];
    }

    categories[category].push({
      title: doc.data.title,
      href: `/wiki/docs/${slugify(category)}/${doc.slug}`,
    });
  });

  const result = [] as any;

  for (const category in categories) {
    result.push({
      title: category,
      links: categories[category],
    });
  }

  return result;
};

export const makeWikiNav = (docs: any[]) => {
  // const gettingStarted = {
  //   title: "Getting Started",
  //   links: [
  //     { title: "Installing the modpack", href: "/docs/installation" },
  //     { title: "Server rules", href: "/docs/installation" },
  //     { title: "Applying to build", href: "/docs/installation" },
  //   ],
  // };

  const normalizedDocs = makeDocsWikiNav(docs);
  const gettingStarted = normalizedDocs.find(
    (x) => x.title === "Getting Started"
  );

  return [
    gettingStarted,
    ...normalizedDocs.filter((x) => x.title !== "Getting Started"),
  ];
};

export function getSlug(str: string) {
  return slgfy(str.replace(/[A-Z]/g, "-$&"), { lower: true });
}

export function filterLocationsBySearchParam(
  locations: any[],
  query: URLSearchParams
) {
  return locations.filter((location) => {
    const queryRegion = query
      .getAll("region")
      .map((region) => region.toLowerCase());

    const queryStatus = query
      .getAll("status")
      .map((status) => status.toLowerCase());

    const queryType = query.getAll("type").map((type) => type.toLowerCase());

    // Filter based on the "region" parameter
    if (queryRegion.length > 0) {
      if (!queryRegion.includes(location.data?.region?.toLowerCase())) {
        return false;
      }
    }

    // Filter based on the "status" parameter
    if (queryStatus.length > 0) {
      if (!queryStatus.includes(location.data?.projectStatus?.toLowerCase())) {
        return false;
      }
    }

    // Filter based on the "type" parameter
    if (queryType.length > 0) {
      if (!queryType.includes(location.data?.projectType?.toLowerCase())) {
        return false;
      }
    }

    return true; // Include the location if it matches all filters
  });
}
