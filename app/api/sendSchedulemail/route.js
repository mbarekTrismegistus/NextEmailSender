
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import prisma from '@/prisma/client';
import dynamic from 'next/dynamic';
import { renderAsync } from '@react-email/render';

const RESEND_API_KEY = "re_2XcUAh4k_LaTe5yeQzBDd5pZEA55JZpbp";

export async function POST(request) {
    
    let data = await request.json()
    let html
    if(data.data.template){
        const Email = dynamic(async() => await import(`../../../emails/${data.data.template}`))
        html = await renderAsync(<Email/>, {
            pretty: true
        })

    }
    else if(data.data.html){
        html = data.data.html
    }
    console.log(html)


    // const transporter = nodemailer.createTransport({
    //     host: 'smtp.gmail.com',
    //     port: 465,
    //     secure: true,
    //     auth: {
    //         user: data.data.user.email,
    //         pass: data.data.user.smptpass,
    //     },
    //     tls: {
    //         ciphers:'SSLv3'
    //     }
    // });

    // const options = {
    //     "from": data.data.user.email,
    //     "to": data.data.recievers,
    //     "subject": "helloo",
    //     "html": html
    // }

    await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
            from: "Acme <onboarding@resend.dev>",
            to: ["momoboogeyman2000@gmail.com"],
            subject: "hello world",
            html: html,
            }),
        });

    // await prisma.email.create({
    //     data: {
    //         template: data.data.template || "Html",
    //         sender: data.data.user.email,
    //         recievers: data.data.recievers,
    //         userId: data.data.user.id
    //     }
    // })

    // await transporter.sendMail(options)

    return NextResponse.json({message: "ok sent"})

    
}