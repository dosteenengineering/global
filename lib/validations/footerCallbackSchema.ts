import { z } from "zod";

export const footerCallbackSchema = z.object({
  name: z.string().min(2, "Name is required"),

  companyName: z.string().optional(),

  email: z.string().email("Invalid email address"),

  contactNumber: z
    .string()
    .min(7, "Invalid contact number")
    .max(20, "Invalid contact number"),

  solutionType: z.string().optional(),
});

export type FooterCallbackFormValues = z.infer<typeof footerCallbackSchema>;