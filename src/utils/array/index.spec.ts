import { arrayUtils } from "@/utils/array";
import { describe, it, expect } from "vitest";

interface Item {
  name: string;
  value: number;
}

type FormattedItem = {
  name: string;
  value: number;
  y: number;
};

describe("Array utils", () => {
  it("Remove from array", () => {
    const result = arrayUtils.remove({
      array: [{ id: 1 }, { id: 2 }, { id: 3 }],
      item: { id: 2 },
      key: "id",
    });

    expect(result).toEqual([{ id: 1 }, { id: 3 }]);
  });

  it("Return a grouped item by name", () => {
    const items: Item[] = [
      {
        name: "Item",
        value: 1,
      },
      {
        name: "Item",
        value: 1,
      },
      {
        name: "Item 2",
        value: 1,
      },
      {
        name: "Item 3",
        value: 1,
      },
    ];

    const result = arrayUtils.groupData<Item, FormattedItem>(
      items,
      (item, formattedItem) => item.name === formattedItem.name,
      (item) => ({
        name: item.name,
        value: item.value,
        y: 1,
      }),
      (formattedItem) => {
        formattedItem.y += 1;
      }
    );

    expect(result).toEqual([
      {
        name: "Item",
        value: 1,
        y: 2,
      },
      {
        name: "Item 2",
        value: 1,
        y: 1,
      },
      {
        name: "Item 3",
        value: 1,
        y: 1,
      },
    ]);
  });
});
