import prisma from '@/prisma/client'
import nodemailer from 'nodemailer'

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0

const RESEND_API_KEY = "re_2XcUAh4k_LaTe5yeQzBDd5pZEA55JZpbp";


export async function GET() {

    let d = await prisma.schedule.findMany({
        include: {
            user: true
        },
        where: {
            isSent: false
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