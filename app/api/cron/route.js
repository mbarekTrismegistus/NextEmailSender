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
    console.log(date)

        d.map((e) => {
            axios.post(`${process.env.BASE_URL}/api/sendSchedulemail`, { data : {
                    user: e.user,
                    recievers: e.recievers,
                    html: e.html || undefined,
                    template: e.template || undefined,
            }})
        })
    console.log("run")

    return NextResponse.json({ message: date });
}