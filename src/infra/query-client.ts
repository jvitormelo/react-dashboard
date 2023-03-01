import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // fast explanation
      // during 1 minute, the query will use the cache, after 1 minute it will be refetched and change the cache of every query that uses the same key
      // so i can avoid a lot of requests and manage the data really easy with hooks
      staleTime: 1 * 60 * 1000,
    },
  },
});
