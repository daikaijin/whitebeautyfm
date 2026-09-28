import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function adminEmail() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase() ?? "";
  if (!EMAIL_PATTERN.test(email) || email.length > 254) return "";
  return email;
}

export function adminAuthConfigured() {
  const secret = process.env.AUTH_SECRET ?? "";
  const clientId = process.env.AUTH_GOOGLE_ID ?? "";
  const clientSecret = process.env.AUTH_GOOGLE_SECRET ?? "";
  return (
    secret.length >= 32 &&
    clientId.length > 0 &&
    clientSecret.length > 0 &&
    adminEmail().length > 0
  );
}

export function isAllowedAdminEmail(email: string | null | undefined) {
  const admin = adminEmail();
  if (!admin || !email) return false;
  return email.trim().toLowerCase() === admin;
}

function googleIdentity(profile: unknown) {
  if (!profile || typeof profile !== "object") {
    return { email: "", verified: false };
  }
  const record = profile as { email?: unknown; email_verified?: unknown };
  const email =
    typeof record.email === "string" ? record.email.trim().toLowerCase() : "";
  return { email, verified: record.email_verified === true };
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: { strategy: "jwt", maxAge: 12 * 60 * 60 },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: { prompt: "select_account" },
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (!adminAuthConfigured()) return false;
      if (account?.provider !== "google") return false;
      const { email, verified } = googleIdentity(profile);
      if (!verified) return false;
      return isAllowedAdminEmail(email);
    },
    async jwt({ token, account, profile }) {
      if (account?.provider === "google") {
        const { email, verified } = googleIdentity(profile);
        if (verified && isAllowedAdminEmail(email)) token.email = email;
        else delete token.email;
      }
      if (!isAllowedAdminEmail(typeof token.email === "string" ? token.email : "")) {
        delete token.email;
      }
      delete token.name;
      delete token.picture;
      return token;
    },
    async session({ session, token }) {
      const email = typeof token.email === "string" ? token.email : "";
      if (!isAllowedAdminEmail(email)) {
        session.user = { ...session.user, email: "", name: null, image: null };
        return session;
      }
      session.user = { ...session.user, email, name: null, image: null };
      return session;
    },
  },
});
