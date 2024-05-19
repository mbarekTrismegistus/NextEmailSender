
import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { auth } from '@/auth/auth';
import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const resend = new Resend(RESEND_API_KEY);

export async function POST(request) {
    
    let data = await request.json()
    let session = await auth()


    let res = await resend.emails.send({
        from: process.env.MAIN_MAIL,
        to: data.data.emails,
        subject: data.data.subject,
        html: data.data.html,
      });

    console.log(res)
    
    if(res.data?.id){
        await prisma.email.create({
            data: {
                key: res.data.id,
                template: data.data.template || "html",
                sender: session.user.name,
                recievers: data.data.emails,
                userId: Number(session.user.id),
                subject: data.data.subject || "no subject"
            }
        })
    }


    return NextResponse.json({message: res.error ? res.error.message : "ok"}, {status: res.error ? res.error.statusCode : 200})

    
}