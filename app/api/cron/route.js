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
    let res

    d.forEach(async(e) => {
        res = await axios.post(`${process.env.BASE_URL}/api/sendSchedulemail`, {
            data: e
        })
        if(res == undefined){
            res = await axios.post(`${process.env.BASE_URL}/api/sendSchedulemail`, {
                data: e
            })
        }
    })
    
    return NextResponse.json({message: res});

}