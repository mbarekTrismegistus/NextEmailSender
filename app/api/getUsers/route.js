import prisma from '@/prisma/client'
import { NextResponse } from 'next/server'

export async function POST(request) {

    let data = await prisma.user.findMany()
    return NextResponse.json({ data })
    
}