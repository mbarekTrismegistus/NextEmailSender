import prisma from "@/prisma/client";
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"



export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({

      credentials: {
        name: {},
        password: {},
      },
      authorize: async(credentials) => {
        
        const user = await prisma.user.findUnique({
          where: {
            name: credentials.name
          }
        })
  
        if (user) {

          let pass = await prisma.user.findUnique({
            select:{
              password: true
            },
            where:{
              name: credentials.name
            }
          })
          
          if(credentials.password == pass.password){

              return user

          }
      
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
      
    }),
  ],
  callbacks: {
    async jwt({user,session,token,trigger}) {
      if(trigger === "update"){
        token = session
      }
      if(user){
        return {
          ...token,
          role: user.role,
          smptpass: user.smptpass
        }
      }
      return token

    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        role: token.role,
        smptpass: token.smptpass
        
      }
      console.log(session)
      return session
    },
    async redirect({ url, baseUrl }) {
      return url
    }
  }
})