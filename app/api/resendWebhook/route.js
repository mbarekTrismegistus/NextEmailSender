import { NextResponse } from 'next/server'
import prisma from '@/prisma/client';

export async function POST(req) {

        const payload = await req.json();
        let res = await prisma.email.update({
            where: {
                key: payload.data.email_id
            },
            data: {
                status: payload.type
            }
        })
        
        console.log(payload);
        return NextResponse.json({ res })
    
    
}