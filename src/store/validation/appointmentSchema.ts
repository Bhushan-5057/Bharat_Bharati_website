import { z } from "zod";

export const appointmentSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .refine(
      (val) => /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(val) && val.trim().length === val.length,
      "Name should only contain letters, single spaces between words, and no leading/trailing spaces"
    ),

  email: z
    .string()
    .email("Invalid email format")
    .regex(
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com)$/,
      "Email must be a valid Gmail, Yahoo, or Outlook address"
    ),

  contact_number: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),

  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),

  reason_of_meeting: z
    .string()
    .min(1, "Reason of meeting is required")
    .refine(
      (val) => val.trim().length === val.length,
      "Reason cannot start or end with a space"
    ),

  your_expectation: z.string().optional(),
  more_details: z.string().optional(),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;
