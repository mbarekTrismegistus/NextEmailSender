import prisma from '@/prisma/client'
import axios from 'axios';
import { NextResponse } from 'next/server'
import {getLocalTimeZone, parseDate, today} from "@internationalized/date";
import dynamic from 'next/dynamic';
import { renderAsync } from '@react-email/render';
import { Resend } from 'resend';
import nodemailer from 'nodemailer'

export async function GET() {

    const resend = new Resend('re_dLFcqiHD_NNWssnCRgtwuj1SrYaGKbTEB');

    // let result = await resend.emails.send({
    //     from: 'onboarding@resend.dev',
    //     to: 'mbarektalbi@zohomail.com',
    //     subject: 'Hello World',
    //     html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
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


    const transporter = nodemailer.createTransport({
        name: 'smtp.zoho.com',
        host: 'smtp.zoho.com',
        port: 465,
        secure: true,
        auth: {
            user: "mbarektalbi@zohomail.com",
            pass: "AKLYwFnwKRgG",
        }
    });

    const options = {
        "from": "mbarektalbi@zohomail.com",
        "to": "mbarektalbi@zohomail.com",
        "subject": "helloo",
        "html": '<h1>Zoho</h1>'
    }

    let result = await transporter.sendMail(options) 

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
    return NextResponse.json({ message: result });
}