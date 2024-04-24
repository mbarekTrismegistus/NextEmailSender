
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
        "from": session.user.email || "momoboogeyman2000@gmail.com",
        "to": data.data.emails || ["momoboogeyman2000@gmail.com"],
        "subject": "helloo",
        "html": data.data.html || "<h1>Cron Function</h1>"
    }

    await prisma.email.create({
        data: {
            template: "1",
            sender: session.user.email || "momoboogeyman2000@gmail.com",
            recievers: data.data.emails || ["momoboogeyman2000@gmail.com"],
            userId: Number(session.user.id) || 1
        }
    })

    await transporter.sendMail(options)

    return NextResponse.json({message: "ok"})

    
}
