import prisma from '@/prisma/client'
import { NextResponse } from 'next/server'

export async function POST(request) {

    const id = await request.json()
    await prisma.schedule.delete({
        where: {
            id: Number(id.data)
        }
    })
    return NextResponse.json({ ok:"ok" })
    
}