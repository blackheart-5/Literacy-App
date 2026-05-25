import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        // Replace this with your logic to validate the user
        const user = await validateUser(email, password); // Define this function
        if (user) {
          return user; // Return user object for session
        }
        return null; // Return null if user not authenticated
      },
    }),
  ],
  debug: true,
  pages: {
    signIn: '/Login', // Custom login page
  },
  secret: process.env.SESSION_SECRET, // Set a strong secret key
  session: {
    strategy: 'jwt', // Use JWT for sessions
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
});
