
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import prisma from '@/prisma/client';


export async function POST(request) {
    
    let html = await request.json()


    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'momoboogeyman2000@gmail.com',
            pass: 'kqbh frwu orwt nsvg',
        },
        tls: {
            ciphers:'SSLv3'
        }
    });

    const options = {
        "from": "momoboogeyman2000@gmail.com",
        "to": "mbarek.talbi666@gmail.com",
        "subject": "helloo",
        "html": html.data
    }

    await prisma.email.create({
        data: {
            template: "1",
            sender: "momoboogeyman2000@gmail.com",
            recievers: ["mbarek.talbi666@gmail.com"],
            userId: 1
        }
    })

    await transporter.sendMail(options)

    return NextResponse.json({message: "ok"})

    
}