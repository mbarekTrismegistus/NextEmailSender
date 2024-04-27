import prisma from '@/prisma/client'
import axios from 'axios';

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0


export async function GET() {

    let d = await prisma.schedule.findMany({
        include: {
            user: true
        },
        where: {
            isSent: false
        }
    })

    d.forEach(async(e) => {
        res = await axios.post(`${process.env.BASE_URL}/api/sendSchedulemail`, {
            data: e})
    })
  
    

    // const transporter = nodemailer.createTransport({
    //     host: 'smtp.gmail.com',
    //     port: 465,
    //     secure: true,
    //     auth: {
    //         user: "momoboogeyman2000@gmail.com",
    //         pass: 'yzrr zowi zzil zclt',
    //     },
    //     tls: {
    //         ciphers:'SSLv3'
    //     }
    // });

    // const options = {
    //     "from": "momoboogeyman2000@gmail.com",
    //     "to": "momoboogeyman2000@gmail.com",
    //     "subject": "helloo",
    //     "html": "momoboogeyman2000@gmail.com"
    // }

    // await transporter.sendMail(options)

    
    return NextResponse.json({message: res});

}