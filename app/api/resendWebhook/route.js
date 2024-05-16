import { NextResponse } from 'next/server'
import prisma from '@/prisma/client';

export async function POST(req) {

        let res

        const payload = await req.json();
        if(payload.type == "email.clicked"){
            res = await prisma.email.update({
                where: {
                    key: payload.data.email_id
                },
                data: {
                    clicks: {
                        push: payload.data.click
                    }
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