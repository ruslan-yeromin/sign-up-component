"use server";

import { db } from "@/lib/db";
import { SignUpSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";

export const createUser = async (values: z.infer<typeof SignUpSchema>) => {
  const validatedFields = SignUpSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const {
    email,
    password,
    newsSubscription,
    firstName,
    lastName,
    company,
    jobTitle,
    companySize,
    industry,
    confirmationCode,
  } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 12);

  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    return { error: "Email already exists" };
  }

  const verificationToken = await db.verificationToken.findUnique({
    where: { email },
  });

  if (!verificationToken || verificationToken.expires < new Date()) {
    return { error: "Invalid code or expired" };
  }

  if (verificationToken.token !== confirmationCode) {
    return { error: "Invalid code" };
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      newsSubscription,
      firstName,
      lastName,
      company,
      jobTitle,
      companySize,
      industry,
      accountVerified: true,
    },
  });

  await db.verificationToken.delete({
    where: { email },
  });

  return { success: "Account created successfully" };
};
