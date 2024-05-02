import prisma from '@/prisma/client'
import { NextResponse } from 'next/server'

export async function POST(request) {

    const data = await request.json()

    await prisma.user.update({
        where: {
            id: data.data.id
        },
        data: data.data.data
    })
    return NextResponse.json({ data })
    
}