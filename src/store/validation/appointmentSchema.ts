import { z } from "zod";

export const appointmentSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .regex(/^[A-Za-z\s]+$/, "Name should only contain letters and spaces"),

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

  reason_of_meeting: z.string().min(1, "Reason of meeting is required"),

  your_expectation: z.string().optional(),
  more_details: z.string().optional(),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;
