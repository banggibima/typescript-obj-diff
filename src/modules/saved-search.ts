import { difference, isUndefined, omitBy } from "lodash";

export type SavedSearch = {
  listingType: "rent" | "sell";
  countyIds: string[];
  propertyTypes: ("house" | "land" | "condo" | "townhome")[];
};

const diffString = (before: string, after: string) => {
  if (before === after) {
    return undefined;
  } else {
    return { before, after };
  }
};

const diffArray = (before: string[], after: string[]) => {
  return {
    added: difference(after, before),
    removed: difference(before, after),
  };
};

type DiffableObject = Record<string, string | string[]>;

type Diff<TObject extends DiffableObject> = {
  [K in keyof TObject]?: TObject[K] extends string[]
    ? { added: string[]; removed: string[] }
    : { before: string; after: string };
};

const diff = <TObject extends DiffableObject>(
  before: TObject,
  after: TObject
): Diff<TObject> => {
  const entries = Object.entries(before).map(([key, value]) => {
    if (typeof value === "string") {
      return [key, diffString(value, after[key] as string)];
    } else {
      return [key, diffArray(value, after[key] as string[])];
    }
  });

  const result = Object.fromEntries(entries);

  return omitBy(result, isUndefined);
};

export default diff;
