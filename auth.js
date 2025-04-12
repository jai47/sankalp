import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { getUserAuth } from '@/actions/users/getUser';

export const { handlers, signIn, signOut, auth } = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            const allowedDomain = '@eitfaridabad.co.in';
            if (!user.email.endsWith(allowedDomain)) {
                console.log('❌ Access denied: Email not from EIT Faridabad');
                return `/auth/error?error=Use college email to login`; // Redirect to an error page
            }

            // Check if user exists in DB
            let existingUser = await getUserAuth(user);

            // // Store user info in the token for session callback
            user.id = existingUser._id.toString();
            user.role = existingUser.role;
            user.image = existingUser.image;

            return true;
        },

        async jwt({ token, user }) {
            // Pass user data from signIn to session
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.image = user.image;
            }
            return token;
        },

        async session({ session, token }) {
            // Attach token data to session.user
            session.user.id = token.id;
            session.user.role = token.role;
            session.user.image = token.image;
            return session;
        },
    },
    pages: {
        error: '/auth/error', // Custom error page
    },
});
