// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"

export default NextAuth ({
  // Configure one or more authentication providers
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      authorization: {
        params: {
          scope: 'public_profile'  // 只请求 public_profile，不请求 email
        }
      }
    }),
    // ...add more providers here
  ],

});
