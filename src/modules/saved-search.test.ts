import diff, { SavedSearch } from "./saved-search";

const buildSavedSearch = (): SavedSearch => ({
  listingType: "sell",
  countyIds: [],
  propertyTypes: ["house"],
});

describe("SavedSearch", () => {
  test("detect changes on string values", () => {
    const before: SavedSearch = { ...buildSavedSearch(), listingType: "sell" };
    const after: SavedSearch = { ...buildSavedSearch(), listingType: "rent" };

    const result = {
      listingType: {
        before: "sell",
        after: "rent",
      },
    };

    expect(diff(before, after)).toMatchObject(result);
  });

  test("ignore equal string values", () => {
    const before: SavedSearch = buildSavedSearch();
    const after: SavedSearch = buildSavedSearch();

    const result = {};

    expect(diff(before, after)).toMatchObject(result);
  });

  test("detect removals on array values", () => {
    const before: SavedSearch = { ...buildSavedSearch(), countyIds: ["id-1"] };
    const after: SavedSearch = { ...buildSavedSearch(), countyIds: [] };

    const result = {
      countyIds: {
        added: [],
        removed: ["id-1"],
      },
    };

    expect(diff(before, after)).toMatchObject(result);
  });

  test("detect additions on array values", () => {
    const before: SavedSearch = { ...buildSavedSearch(), countyIds: [] };
    const after: SavedSearch = { ...buildSavedSearch(), countyIds: ["id-1"] };

    const result = {
      countyIds: {
        added: ["id-1"],
        removed: [],
      },
    };

    expect(diff(before, after)).toMatchObject(result);
  });

  test("detect additions and removals on array values", () => {
    const before: SavedSearch = { ...buildSavedSearch(), countyIds: ["id-1"] };
    const after: SavedSearch = { ...buildSavedSearch(), countyIds: ["id-2"] };

    const result = {
      countyIds: {
        added: ["id-2"],
        removed: ["id-1"],
      },
    };

    expect(diff(before, after)).toMatchObject(result);
  });
});
