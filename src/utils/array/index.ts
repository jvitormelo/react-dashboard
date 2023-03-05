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

export const arrayUtils = {
  update,
  remove,
};
