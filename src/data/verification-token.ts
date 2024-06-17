import { db } from "@/lib/db";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { email },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const deleteVerificationToken = async (email: string) => {
  try {
    await db.verificationToken.delete({
      where: { email },
    });
  } catch (error) {
    console.error("Error while deleting token:", error);
    return null;
  }
};
