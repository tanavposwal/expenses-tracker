import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userAPI } from '../services/api.js';
import { queryKeys, invalidateQueries } from '../lib/queryClient.js';
import { showToast } from '../utils/helpers.js';

// Custom hook for user authentication verification
export const useVerifyToken = (token) => {
    return useQuery({
        queryKey: queryKeys.user.verify(token),
        queryFn: () => userAPI.verifyToken(token),
        enabled: !!token, // Only run if token exists
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: false, // Don't retry token verification
    });
};

// Custom hook for user login
export const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ email, password }) => userAPI.login(email, password),
        onSuccess: (data) => {
            if (data.success) {
                showToast.success(data.message);
                // Invalidate user queries to refresh auth state
                invalidateQueries.user();
            } else {
                showToast.error(data.message);
            }
        },
        onError: (error) => {
            showToast.error("Login failed. Please try again.");
            console.error("Login error:", error);
        },
    });
};

// Custom hook for user signup
export const useSignup = () => {
    return useMutation({
        mutationFn: (userData) => userAPI.signup(userData),
        onSuccess: (data) => {
            if (data.success) {
                showToast.success(data.message);
            } else {
                showToast.error(data.message);
            }
        },
        onError: (error) => {
            showToast.error("Signup failed. Please try again.");
            console.error("Signup error:", error);
        },
    });
};
