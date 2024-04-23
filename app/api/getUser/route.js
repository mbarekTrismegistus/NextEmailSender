import prisma from '@/prisma/client'
import { NextResponse } from 'next/server'

export async function POST(request) {

    const name = await request.json()

    let data = await prisma.user.findUnique({
        where: {
            name: name.name
        }
    })
    return NextResponse.json({ data })
    
}