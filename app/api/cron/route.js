import prisma from '@/prisma/client'
import {getLocalTimeZone, parseDate, today} from "@internationalized/date";
import axios from 'axios';

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0


export async function GET(request) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', {
        status: 401,
        });
    }

   


    let res = await new Promise(async(resolve, reject) => {
        
        async function send(){
            let d = await prisma.schedule.findMany({
                include: {
                    user: true
                },
                where: {
                    isSent: false,
                    date: {
                        lte: today(getLocalTimeZone()).toDate(),
                    }
                }
            })
            if(d.length > 0){

                let status = d.map( async(e) => {
                    try {
                        let res = await axios.post(`${process.env.BASE_URL}/api/sendSchedulemail`, {
                            data: e
                        })
                        return res.data.message
                    } catch (error) {
                        console.error(error.response.data); 
                    }

                })
                Promise.all(status).then(() => {
                    send()
                })
            }
        }
        send()

    });
    
    
    Promise.resolve(res).then(() => {
        return NextResponse.json({message: "ok"});
    })

}