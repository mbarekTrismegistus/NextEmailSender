import prisma from '@/prisma/client'
import {getLocalTimeZone, parseDate, today} from "@internationalized/date";

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0


export async function GET(request) {
    // const authHeader = request.headers.get('authorization');
    // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    //     return new Response('Unauthorized', {
    //     status: 401,
    //     });
    // }

    let d = await prisma.schedule.findMany({
        include: {
            user: true
        },
        where: {
            isSent: false,
            // date: {
            //     lte: today(getLocalTimeZone()).toDate(),
            // }
        }
    })


    let res = await new Promise((resolve, reject) => {

        d.forEach((e) => {
            fetch(`${process.env.BASE_URL}/api/sendSchedulemail`,{
                method: "POST",
                body: JSON.stringify({
                    data: e
                })
            })
        })
        
    });
    
    Promise.resolve(res).then(() => {
        return NextResponse.json({message: "ok"});
    })

}