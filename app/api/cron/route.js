import prisma from '@/prisma/client'

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";


export async function GET() {


    let d = await prisma.schedule.findMany({
        include: {
            user: true
        },
        where: {
            isSent: false
        }
    })


    d.map(async(e) => {
        await fetch(`${process.env.BASE_URL}/api/sendSchedulemail`, {
            method: "POST",
            body: JSON.stringify({
                data: e
            })
        })
    })
    
    return NextResponse.json({message: "aok"});

}