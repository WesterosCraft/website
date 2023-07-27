import type { Location, Page } from "./payload-types";
import { LocationQuery, RookeryQuery } from "./queries";
import { camelize } from "./utils";

export const fetcher = async (
  api: string,
  method: RequestInit["method"],
  payload: Record<any, any>
) => {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  } as RequestInit;

  if (method === "POST") {
    options.body = JSON.stringify(payload);
  }
  return await fetch(api, options).then((res) => res.json());
};

export const fetchLocationsByRegion = async (
  region: string
): Promise<Location[]> => {
  const query = {
    query: `{
      Locations(
        limit: 300
        where: { projectDetails__information__region: { equals: ${camelize(
          region
        )} } }
      ) {
        docs {
          id
          locationName
          slug
        }
      }
    }`,
  };

  const locations = await fetcher(
    `http://localhost:3000/api/graphql`,
    "POST",
    query
  );

  return locations.data.Locations.docs;
};

export const fetchLocationBySlug = async (slug: string): Promise<Location> => {
  const query = {
    query: LocationQuery(slug),
  };

  const location = await fetcher(
    `http://localhost:3000/api/graphql`,
    "POST",
    query
  );

  return location?.data?.Locations?.docs?.[0];
};

export const getRookeryPage = async (): Promise<Page> => {
  const query = {
    query: RookeryQuery(),
  };
  const rookeryPage: { data: { Page: Page } } = await fetcher(
    `http://localhost:3000/api/graphql`,
    "POST",
    query
  );

  return rookeryPage?.data?.Page;
};
