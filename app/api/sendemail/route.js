
import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { auth } from '@/auth/auth';

const RESEND_API_KEY = "re_2XcUAh4k_LaTe5yeQzBDd5pZEA55JZpbp";

export async function POST(request) {
    
    let data = await request.json()
    let session = await auth()

    let res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
            from: process.env.MAIN_MAIL,
            to: data.data.emails,
            subject: data.data.subject,
            html: data.data.html,
            }),
    });
    if(res.status == 200){
        await prisma.email.create({
            data: {
                template: data.data.template || "html",
                sender: session.user.name,
                recievers: data.data.emails,
                userId: Number(session.user.id),
                subject: data.data.subject || "no subject"
            }
        })
    }


    return NextResponse.json({message: "ok"}, {status: res.status})

    
}