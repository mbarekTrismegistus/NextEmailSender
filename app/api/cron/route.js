import prisma from '@/prisma/client'

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
    let res

    d.map(async(e) => {
        res = await fetch(`${process.env.BASE_URL}/api/sendSchedulemail`, {
            method: "POST",
            body: JSON.stringify({
                data: e
            })
        })
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
    console.log(res)
    
    return NextResponse.json({message: res});

}