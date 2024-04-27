import prisma from '@/prisma/client'
import nodemailer from 'nodemailer'

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0

const RESEND_API_KEY = "re_2XcUAh4k_LaTe5yeQzBDd5pZEA55JZpbp";


export async function GET() {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: "momoboogeyman2000@gmail.com",
            pass: "yzrr zowi zzil zclt",
        },
        tls: {
            ciphers:'SSLv3'
        }
    });

    const options = {
        "from": "momoboogeyman2000@gmail.com",
        "to": "momoboogeyman2000@gmail.com",
        "subject": "helloo",
        "html": "light function"
    }

    let d = await prisma.schedule.findMany({
        include: {
            user: true
        },
        where: {
            isSent: false
        }
    })

    const mailData = {
        from: {
            name: `momoboogeyman2000@gmail.com`,
            address: "momoboogeyman2000@gmail.com",
        },
        replyTo: "momoboogeyman2000@gmail.com",
        to: "momoboogeyman2000@gmail.com",
        subject: `form message`,
        text: "momoboogeyman2000@gmail.com",
        html: `momoboogeyman2000@gmail.com`,
    };
    
    
    await new Promise((resolve, reject) => {
        // verify connection configuration
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log("Server is ready to take our messages");
                resolve(success);
            }
        });
    });

    await new Promise((resolve, reject) => {
        // send mail
        transporter.sendMail(mailData, (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log(info);
                resolve(info);
            }
        });
    });
    
   
    

    // d.forEach(async(e) => {
    //     await fetch("https://api.resend.com/emails", {
    //         method: "POST",
    //         headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${RESEND_API_KEY}`,
    //         },
    //         body: JSON.stringify({
    //         from: "Acme <onboarding@resend.dev>",
    //         to: ["momoboogeyman2000@gmail.com"],
    //         subject: "hello world",
    //         html: "html",
    //         }),
    //     });
    // })

    
    
    return NextResponse.json({message: "ok"});

}