import prisma from "@/prisma/client";
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        name: {},
        password: {},
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const userAccount = await prisma.user.findUnique({
          where: {
            name: credentials.name
          }
        })
  
        if (userAccount) {

          let pass = await prisma.user.findUnique({
            select:{
              password: true
            },
            where:{
              name: credentials.name
            }
          })
          
         
          
          if(credentials.password == pass.password){
            return userAccount
          }
      
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
      callbacks: {
        async jwt({session,token,user,trigger}) {
          if(trigger === "update"){
            token = session
          }
          if(user){
            return {
              ...token,
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,

            }
          }
          return token;
        },
        async session({ session, token, user }) {
  
          return {
            ...session.user,
            id: token.id,
            name: token.name,
            email: token.email,
            role: token.role,
            
  
          }
        },
        async redirect({ url, baseUrl }) {
          return url
        }
      }
    }),
  ],
})