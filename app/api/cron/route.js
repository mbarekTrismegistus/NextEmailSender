import prisma from '@/prisma/client'
import axios from 'axios';
import { NextResponse } from 'next/server'

export async function GET() {
    let d = await prisma.schedule.findMany({
        include: {
            user: true
        },
        where: {
            isSent: false,
            date: new Date().toISOString()
        }
    })
    console.log("run")

    if(d){
        d.map((e) => {
            axios.post(`${process.env.BASE_URL}/api/sendSchedulemail`, { data : {
                    user: e.user,
                    recievers: e.recievers,
                    html: e.html || undefined,
                    template: e.template || undefined,
            }})
        })
    }
    return Response.json({ message: d });
}