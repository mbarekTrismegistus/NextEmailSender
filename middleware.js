import { NextResponse } from 'next/server'
import { auth } from './auth/auth'
 
export default async function middleware(req){

    const session = await auth()
    
    if(session){
        if (session.user.role !== "admin" && req.nextUrl.pathname.startsWith("/dashboard")) {
          return NextResponse.redirect("http://localhost:3000/")
        }
    }
    else{
        return NextResponse.redirect("http://localhost:3000/")
    }

}

export const config = {
  matcher: ['/dashboard','/dashboard/:path*','/emails/:path*','/rawhtml'],
}