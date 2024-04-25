
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import prisma from '@/prisma/client';
import { auth } from '@/auth/auth';


export async function POST(request) {
    
    let data = await request.json()
    let session = await auth()


    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: session.user.email,
            pass: session.user.smptpass,
        },
        tls: {
            ciphers:'SSLv3'
        }
    });

    const options = {
        "from": session.user.email,
        "to": data.data.emails,
        "subject": "helloo",
        "html": data.data.html
    }

    await prisma.email.create({
        data: {
            template: "1",
            sender: session.user.email,
            recievers: data.data.emails,
            userId: Number(session.user.id)
        }
    })

    await transporter.sendMail(options)

    return NextResponse.json({message: "ok"})

    
}