import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import { connectToDB } from "@utils/database";

import { v4 as uuidv4 } from "uuid";

const handler = NextAuth({
  providers: [
    GoogleProvider({ clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! }),
  ],
  callbacks: {
    async session({ session }) {
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        const userExists = await User.findOne({ email: profile!.email });
        if (!userExists) {
          await User.create({
            id: uuidv4(),
            email: profile!.email,
            username: profile!
              .name!.normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(" ", "")
              .toLowerCase(),
            image: profile!.picture,
          });
        }

        return true;
      } catch (error) {
        console.log("error:", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
