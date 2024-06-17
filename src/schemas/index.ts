import * as z from "zod";

export const SignUpSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Password is required",
  }),
  newsSubscription: z.boolean(),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  company: z.string().min(1, { message: "Company is required" }),
  jobTitle: z.string().min(1, { message: "Job title is required" }),
  companySize: z.string().min(1, { message: "Company size is required" }),
  industry: z.string().min(1, { message: "Industry is required" }),
  confirmationCode: z.string({
    message: "Please enter the confirmation code from your email",
  }),
});
