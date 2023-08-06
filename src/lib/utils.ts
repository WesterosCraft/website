import { regionOptions } from "@constants/index";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
  var words = slug?.split("-");
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

  const result = [];

  for (const category in categories) {
    result.push({
      title: category,
      links: categories[category],
    });
  }

  return result;
};

export const makeRegionWikiNav = () => {
  return [
    {
      title: "Locations By Region",
      links: regionOptions.map((x) => ({
        title: x.label,
        href: `/wiki/locations/${slugify(x.label)}`,
      })),
    },
  ];
};

export const makeWikiNav = (docs: any[]) => {
  const gettingStarted = {
    title: "Getting Started",
    links: [
      { title: "Installing the modpack", href: "/docs/installation" },
      { title: "Server rules", href: "/docs/installation" },
      { title: "Applying to build", href: "/docs/installation" },
    ],
  };

  const normalizedDocs = makeDocsWikiNav(docs);
  const normalizedLocations = makeRegionWikiNav();

  return [gettingStarted, ...normalizedLocations, ...normalizedDocs];
};
