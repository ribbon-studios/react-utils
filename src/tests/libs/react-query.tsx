import { wrap } from '../wrap';
import { QueryClient, QueryClientProvider as Provider } from '@tanstack/react-query';

export const QueryClientProvider = wrap(Provider, () => ({
  client: new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  }),
}));
