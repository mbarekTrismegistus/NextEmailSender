
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Email from '@/app/email';
import { render } from '@react-email/render';


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

    await transporter.sendMail(options)

    return NextResponse.json({message: "ok"})

    
}