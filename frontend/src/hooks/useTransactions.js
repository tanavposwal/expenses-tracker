import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionAPI } from '../services/api.js';
import { queryKeys, invalidateQueries } from '../lib/queryClient.js';
import { showToast } from '../utils/helpers.js';

// Custom hook for fetching transactions
export const useTransactions = () => {
    return useQuery({
        queryKey: queryKeys.transactions.list(),
        queryFn: async () => {
            const response = await transactionAPI.getTransactions();
            return response.transactions || [];
        },
        staleTime: 2 * 60 * 1000, // 2 minutes - transactions change frequently
        gcTime: 5 * 60 * 1000, // 5 minutes
        retry: (failureCount, error) => {
            // Don't retry on auth errors
            if (error?.response?.status === 401 || error?.response?.status === 403) {
                return false;
            }
            return failureCount < 2;
        },
    });
};

// Custom hook for adding a transaction
export const useAddTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (transactionData) => transactionAPI.addTransaction(transactionData),
        onSuccess: (data) => {
            showToast.success(data.message);

            // Optimistically update the cache
            queryClient.setQueryData(queryKeys.transactions.list(), (oldData) => {
                if (!oldData) return oldData;

                // Add the new transaction to the beginning of the list
                const newTransaction = {
                    ...data.transaction,
                    date: new Date().toLocaleDateString('en-GB'),
                };

                return [newTransaction, ...oldData];
            });

            // Invalidate to ensure consistency
            invalidateQueries.transactions();
        },
        onError: (error) => {
            showToast.error("Failed to add transaction. Please try again.");
            console.error("Add transaction error:", error);

            // Revert optimistic update on error
            invalidateQueries.transactions();
        },
    });
};

// Custom hook for deleting a transaction
export const useDeleteTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => transactionAPI.deleteTransaction(id),
        onSuccess: (data, id) => {
            showToast.success(data.message);

            // Optimistically update the cache
            queryClient.setQueryData(queryKeys.transactions.list(), (oldData) => {
                if (!oldData) return oldData;

                // Remove the transaction with the given id
                return oldData.filter((_, index) => index !== parseInt(id));
            });

            // Invalidate to ensure consistency
            invalidateQueries.transactions();
        },
        onError: (error) => {
            showToast.error("Failed to delete transaction. Please try again.");
            console.error("Delete transaction error:", error);

            // Revert optimistic update on error
            invalidateQueries.transactions();
        },
    });
};

// Custom hook for prefetching transactions
export const usePrefetchTransactions = () => {
    const queryClient = useQueryClient();

    return () => {
        queryClient.prefetchQuery({
            queryKey: queryKeys.transactions.list(),
            queryFn: async () => {
                const response = await transactionAPI.getTransactions();
                return response.transactions || [];
            },
            staleTime: 2 * 60 * 1000,
        });
    };
};
