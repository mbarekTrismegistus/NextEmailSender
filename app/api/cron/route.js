import prisma from '@/prisma/client'
import axios from 'axios';
import { NextResponse } from 'next/server'
import {getLocalTimeZone, parseDate, today} from "@internationalized/date";

export async function GET() {
    let date = today(getLocalTimeZone()).toDate()
    let d = await prisma.schedule.findMany({
        include: {
            user: true
        },
        where: {
            isSent: false,
            date: date
        }
    })

    await axios.post(`${process.env.BASE_URL}/api/sendSchedulemail`, { data : {
        user: d[0].user,
        recievers: d[0].recievers,
        html: d[0].html || undefined,
        template: d[0].template || undefined,
    }})
    return NextResponse.json({ message: "ok" });
}