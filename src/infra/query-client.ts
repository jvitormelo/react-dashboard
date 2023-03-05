import { arrayUtils } from "@/utils/array";
import { QueryClient, QueryKey } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // fast explanation
      // during 10 minute, the query will use the cache, after 1 minute it will be refetched and change the cache of every query that uses the same key
      // so i can avoid a lot of requests and manage the data really easy with hooks
      // i can easily change the time, but for the test i will use 10 minutes to do All the CRUD operations
      staleTime: 10 * 60 * 1000,

      // If the back-end gives an error, the query will retry 1 time
      retry: 1,
    },
  },
});

type BaseItem = { id: number | string };

interface MultipleKeys {
  itemKey: QueryKey;
  arrayKey: QueryKey;
}

type RemoveFromCache = MultipleKeys & { id: number | string };

type AddOrUpdate<T> = MultipleKeys & { item: T };

export const queryClientHelpers = {
  select: <T extends BaseItem>(key: QueryKey, item: T) => {
    queryClient.setQueryData(key, item);
  },
  removeFromCache: <T extends BaseItem>({
    arrayKey,
    itemKey,
    id,
  }: RemoveFromCache) => {
    queryClient.removeQueries(itemKey, {
      exact: true,
    });

    queryClient.setQueryData<T[]>(arrayKey, (assets) => {
      return arrayUtils.remove<T>({
        array: assets,
        item: { id } as T,
        key: "id",
      });
    });
  },
  addOrUpdate: <T extends BaseItem>({
    arrayKey,
    item,
    itemKey,
  }: AddOrUpdate<T>) => {
    queryClient.setQueryData(itemKey, item);

    queryClient.setQueryData<T[]>(arrayKey, (oldData) => {
      return arrayUtils.updateOrCreate<T>({
        array: oldData,
        item,
        key: "id",
      });
    });
  },
};
