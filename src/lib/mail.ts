import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationCode = async (email: string, token: string) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.EMAIL_ADRESS ?? "default@example.com",
      subject: "Your two-factor authentication code",
      html: `<p>Your two-factor authentication code is ${token}</p>`,
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
