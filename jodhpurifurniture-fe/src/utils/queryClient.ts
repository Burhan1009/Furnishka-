import { QueryClientProvider, QueryClient, Hydrate } from 'react-query';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { persistQueryClient } from '@tanstack/react-query-persist-client';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 4 * 60 * 60 * 1000,
      refetchOnWindowFocus:false,
      retry: false,
    }
  }
});

const isWindow = typeof window !== "undefined" && window.localStorage
const localStoregePersistor = createSyncStoragePersister({
  storage:isWindow 
});

 persistQueryClient({
  queryClient,
  persister: localStoregePersistor,
  maxAge: 4 * 60 * 60 * 1000,
  hydrateOptions: undefined,
  dehydrateOptions: undefined
});


// export const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       cacheTime: 4  60  60 * 1000,
//       refetchOnWindowFocus: false,
//       retry: false,
//     },
//   },
// });
// const localStoregePersistor = createSyncStoragePersister({
//   storage: typeof window !== "undefined" ? window?.localStorage : undefined,
// });
// persistQueryClient({
//   queryClient,
//   persister: localStoregePersistor,
//   maxAge: 4  60  60 * 1000,
//   dehydrateOptions: {
//     shouldDehydrateQuery: (query: any) => {
//       const queryIsReady = query.state.status === "success";
//       if (queryIsReady) {
//         const { queryKey } = query;
//         const exludeQuery =
//           queryKey.includes("get-google-link") ||
//           queryKey.includes("get-vimeo-link") ||
//           queryKey.includes("get-twitter-link") ||
//           queryKey.includes("get-youtube-link") ||
//           queryKey.includes("user") ||
//           queryKey.includes("ai-history");
//         return !exludeQuery;
//       }
//       return queryIsReady;
//     },
//   },
// });