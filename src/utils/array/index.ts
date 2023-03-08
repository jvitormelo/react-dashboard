interface Params<T> {
  array?: T[];
  item: T;
  key: keyof T;
}

const update = <T>({ item, key, array }: Params<T>): undefined | T[] => {
  if (!array) return array;

  const index = array.findIndex((i) => i[key] === item[key]);

  const copy: T[] = structuredClone(array);

  if (index >= 0) {
    copy[index] = item;
  }

  return copy;
};

const remove = <T>({ array, item, key }: Params<T>): undefined | T[] => {
  if (!array) return array;

  const index = array.findIndex((i) => i[key] === item[key]);

  const copy: T[] = structuredClone(array);

  if (index >= 0) {
    copy.splice(index, 1);
  }

  return copy;
};

const groupData = <Item, FormattedItem>(
  items: Item[],
  findFn: (item: Item, value: FormattedItem) => boolean,
  pushFormattedItemFn: (value: Item) => FormattedItem,
  onFormattedItemFn: (value: FormattedItem) => void
): FormattedItem[] => {
  const result: FormattedItem[] = [];

  items.forEach((item) => {
    const index = result.findIndex((formattedItem) =>
      findFn(item, formattedItem)
    );

    if (index === -1) {
      result.push(pushFormattedItemFn(item));
    } else {
      onFormattedItemFn(result[index]);
    }
  });

  return result;
};

export const arrayUtils = {
  update,
  remove,
  groupData,
};
