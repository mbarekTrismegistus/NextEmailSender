import prisma from '@/prisma/client'
import { NextResponse } from 'next/server'

export async function POST(request) {

    const data = await request.json()

    await prisma.schedule.create({
        data: {
            ...data.data,
            isSent: false,
            template: data.data.template || "html"
        }
    })

    return NextResponse.json({ data })
    
}