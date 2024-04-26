import prisma from '@/prisma/client'
import axios from 'axios';
import { NextResponse } from 'next/server'
import {getLocalTimeZone, parseDate, today} from "@internationalized/date";
import dynamic from 'next/dynamic';
import { renderAsync } from '@react-email/render';
import { Resend } from 'resend';
import nodemailer from 'nodemailer'

export async function GET() {

    // const resend = new Resend('re_S9m5Yo8b_CDvXhJcrTEKMYWzHzjhte6zR');

    // resend.emails.send({
    // from: 'onboarding@resend.dev',
    // to: 'momoboogeyman2000@gmail.com',
    // subject: 'Hello World',
    // html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    // });

    // let date = today(getLocalTimeZone()).toDate()
    // let html

    // let d = await prisma.schedule.findMany({
    //     include: {
    //         user: true
    //     },
    //     where: {
    //         isSent: false
    //     }
    // })

    // if(d[0].template){
    //     const Email = dynamic(async() => await import(`../../../emails/${d[0].template}`))
    //     html = await renderAsync(<Email/>)

    // }
    // else if(d[0].html){
    //     html = d[0].html
    // }


    const transport = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true, //ssl
        auth: {
            user:"mbarektalbi@zohomail.com",
            pass: "JPqbkC1fg2AV"
        }
    });

    const options = {
        "from": 'mbarektalbi@zohomail.com',
        "to": "momoboogeyman2000@gmail.com",
        "subject": "helloo",
        "html": "<h1>zoho email</h1>"
    }

    await transport.sendMail(options) 

    // await prisma.email.create({
    //     data: {
    //         template: d[0].template || "Html",
    //         sender: d[0].user.email,
    //         recievers: d[0].recievers,
    //         userId: d[0].user.id
    //     }
    // })

    

    
    

    // let result = await axios.post(`${process.env.BASE_URL}/api/sendSchedulemail`, { data : {
    //     user: d[0].user,
    //     recievers: d[0].recievers,
    //     html: d[0].html || undefined,
    //     template: d[0].template || undefined,
    // }})
    return NextResponse.json({ message: "ok" });
}