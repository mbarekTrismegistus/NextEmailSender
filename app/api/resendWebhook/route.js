import { NextResponse } from 'next/server'
import prisma from '@/prisma/client';

export async function POST(req) {

        let res

        const payload = await req.json();
        if(payload.type == "email.clicked"){
            res = await prisma.click.upsert({
                data: {
                    ipAddress: payload.data.click.ipAddress,
                    timestamp: payload.data.click.timestamp,
                    emailKey: payload.data.email_id,
                    link: payload.data.click.link
                }
            })
        }
        else{
            res = await prisma.email.update({
                where: {
                    key: payload.data.email_id
                },
                data: {
                    status: payload.type
                }
            })
        }
        

        return NextResponse.json({ res })
    
    
}