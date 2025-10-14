import { QueryClient } from '@tanstack/react-query';

// Query Keys - Centralized and typed
export const queryKeys = {
    // User related queries
    user: {
        all: ['user'] as const,
        verify: (token: string) => [...queryKeys.user.all, 'verify', token] as const,
    },

    // Transaction related queries
    transactions: {
        all: ['transactions'] as const,
        list: () => [...queryKeys.transactions.all, 'list'] as const,
        detail: (id: string) => [...queryKeys.transactions.all, 'detail', id] as const,
    },
} as const;

// Query Client Configuration
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Cache time
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)

            // Retry configuration
            retry: (failureCount, error: any) => {
                // Don't retry on 401/403 errors
                if (error?.response?.status === 401 || error?.response?.status === 403) {
                    return false;
                }
                // Retry up to 3 times for other errors
                return failureCount < 3;
            },

            // Refetch configuration
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,

            // Error handling
            throwOnError: false,
        },
        mutations: {
            // Retry mutations once
            retry: 1,

            // Error handling
            throwOnError: false,
        },
    },
});

// Query invalidation helpers
export const invalidateQueries = {
    user: () => queryClient.invalidateQueries({ queryKey: queryKeys.user.all }),
    transactions: () => queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all }),
    all: () => queryClient.invalidateQueries(),
};

// Prefetch helpers
export const prefetchQueries = {
    transactions: () => queryClient.prefetchQuery({
        queryKey: queryKeys.transactions.list(),
        queryFn: async () => {
            const { transactionAPI } = await import('../services/api.js');
            const response = await transactionAPI.getTransactions();
            return response.transactions || [];
        },
    }),
};
