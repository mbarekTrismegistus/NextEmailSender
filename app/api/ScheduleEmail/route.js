import prisma from '@/prisma/client'
import { NextResponse } from 'next/server'

export async function POST(request) {

    const data = await request.json()

    await prisma.schedule.create({
        data: {
            ...data.data,
            isSent: false
        }
    })

    return NextResponse.json({ data })
    
}