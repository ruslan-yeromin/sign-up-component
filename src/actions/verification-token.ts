"use server";

import { getVerificationTokenByEmail } from "@/data/verification-token";
import { db } from "@/lib/db";
import { sendVerificationCode } from "@/lib/mail";

export const generateVerificationToken = async (email: string) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = new Date(new Date().getTime() + 1000 * 60 * 10);

  const existingCode = await getVerificationTokenByEmail(email);

  if (existingCode) {
    await db.verificationToken.delete({
      where: {
        email: email,
      },
    });
  }

  const VerificationCode = await db.verificationToken.create({
    data: {
      token: code,
      email: email,
      expires: expires,
    },
  });

  await sendVerificationCode(VerificationCode.email, VerificationCode.token);

  return { success: "OTP code successfully sent" };
};

export const deleteVerificationToken = async (email: string) => {
  try {
    await db.verificationToken.delete({
      where: { email },
    });
  } catch (error) {
    console.error("Error while deleting OTP code:", error);
    return null;
  }
};
