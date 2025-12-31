import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Admin Login",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "admin" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const user = { id: "1", name: "Admin", email: "admin@example.com" };

                // Simple check against env variables
                if (
                    credentials.username === process.env.ADMIN_USER &&
                    credentials.password === process.env.ADMIN_PASSWORD
                ) {
                    return user;
                }
                return null;
            }
        })
    ],
    pages: {
        signIn: "/auth/signin", // Custom signin page if we want, or default
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
