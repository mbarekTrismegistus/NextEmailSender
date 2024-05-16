import prisma from '@/prisma/client'
import { NextResponse } from 'next/server'

export async function POST(request) {

    const params = await request.json()

    let data = await prisma.email.findMany({
        where:{
            userId: Number(params.data.user) || undefined,
            status: params.data.status == "all" ? undefined : params.data.status
        },
        include: {
            user: true
        },
        take: params.data.take,
        skip: params.data.skip >= 0 ? params.data.skip : 0,
        orderBy: {
            dateSend: "desc"
        }
    })
    let emailsCount = await prisma.email.count({
        where: {
            userId: Number(params.data.user) || undefined,
            status: params.data.status == "all" ? undefined : params.data.status
        }
    })

    return NextResponse.json({ data: data, emailsCount: emailsCount })
    
}