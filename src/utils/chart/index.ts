// TODO - WRITE TESTS

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

export const chartUtils = {
  groupData,
};
