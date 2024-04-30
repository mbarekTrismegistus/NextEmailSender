
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
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
            from: "Contact@brosmedia.ma",
            to: ["cns2023bros@gmail.com"],
            subject: "hello world",
            html: data.data.html,
            }),
    });

    await prisma.email.create({
        data: {
            template: data.data.template || "Html",
            sender: session.user.email,
            recievers: data.data.emails,
            userId: Number(session.user.id)
        }
    })


    return NextResponse.json({message: "ok"})

    
}