import prisma from '@/prisma/client'
import { NextResponse } from 'next/server'

export async function POST(request) {


    let data = await prisma.schedule.findMany({
        where:{
            isSent: false
        },
        include: {
            user: true
        }
    })

    return NextResponse.json({ data })
    
}