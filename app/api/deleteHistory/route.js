import prisma from '@/prisma/client'
import { NextResponse } from 'next/server'

export async function POST() {


    let res = await prisma.email.deleteMany()
    return NextResponse.json({ res })
    
}