import prisma from '@/prisma/client'
import { NextResponse } from 'next/server'

export async function POST(request) {

    const dates = await request.json()

    let data = []

    for(let i = 0; i < dates.dates.length; i++){

        let d = await prisma.email.count({
            where: {
                dateSend: {
                    lte: dates.dates[i],
                    gte: dates.dates[i+1] || dates.dates[i]
                }
            }
        })
        
        data.push(d)
        
    }

    return NextResponse.json({ data })
    
}