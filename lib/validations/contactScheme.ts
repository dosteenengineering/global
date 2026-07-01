// validations/contactEnquirySchema.ts
import { z } from "zod";

export const contactEnquirySchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  companyName: z.string().optional(),
  role: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(7, "Invalid phone number")
    .max(20, "Invalid phone number"),
  projectLocation: z.string().optional(),
  systemOfInterest: z.string().optional(),
  projectBrief: z.string().optional(),
});

export type ContactEnquiryFormValues = z.infer<typeof contactEnquirySchema>;
