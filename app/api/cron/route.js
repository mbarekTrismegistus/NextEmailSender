import prisma from '@/prisma/client'
import axios from 'axios';
import { NextResponse } from 'next/server'
import {getLocalTimeZone, parseDate, today} from "@internationalized/date";
import dynamic from 'next/dynamic';
import { renderAsync } from '@react-email/render';
import nodemailer from 'nodemailer';

export async function GET() {

    let date = today(getLocalTimeZone()).toDate()
    let html

    let d = await prisma.schedule.findMany({
        include: {
            user: true
        },
        where: {
            isSent: false
        }
    })

    if(d[0].template){
        const Email = dynamic(async() => await import(`../../../emails/${d[0].template}`))
        html = await renderAsync(<Email/>)

    }
    else if(d[0].html){
        html = d[0].html
    }


    const transporter = nodemailer.createTransport({
        name: 'smtp.gmail.com',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: d[0].user.email,
            pass: d[0].user.smptpass,
        },
        tls: {
            ciphers:'SSLv3'
        }
    });

    const options = {
        "from": d[0].user.email,
        "to": d[0].recievers,
        "subject": "helloo",
        "html": html
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