import { z } from "zod";

// Validation schemas
export const signupSchema = z.object({
  fullname: z.string()
    .min(1, "Full name is required")
    .max(50, "Full name must be less than 50 characters")
    .trim(),
  email: z.string()
    .min(1, "Email is required")
    .max(100, "Email must be less than 100 characters")
    .email("Invalid email format")
    .toLowerCase()
    .trim(),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters")
});

export const loginSchema = z.object({
  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email format")
    .toLowerCase()
    .trim(),
  password: z.string()
    .min(1, "Password is required")
});

export const transactionSchema = z.object({
  amount: z.string()
    .min(1, "Amount is required")
    .max(10, "Amount must be less than 10 digits")
    .regex(/^\d+$/, "Amount must be a positive number"),
  type: z.enum(['income', 'expense'], {
    errorMap: () => ({ message: "Type must be either 'income' or 'expense'" })
  }),
  brief: z.string()
    .min(1, "Brief description is required")
    .max(100, "Brief description must be less than 100 characters")
    .trim()
});

export const paramsSchema = z.object({
  id: z.string().regex(/^\d+$/, "Invalid transaction ID")
});
