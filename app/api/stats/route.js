import prisma from '@/prisma/client'
import { NextResponse } from 'next/server'

export async function POST(request) {

        let count = await prisma.email.count()
        let waitingEmails = await prisma.schedule.count({
            where: {
                isSent: false
            }
        })

        let withHtml = await prisma.email.count({
            where: {
                OR: [
                    {
                        template: "html"
                    }
                ]
            }
        })
        let withTempl = await prisma.email.count({
            where: {
                NOT: [
                    {
                        template: "html"
                    }
                ]
            }
        })

    return NextResponse.json({ data: {
        count: count,
        withHtml: withHtml,
        withTempl: withTempl,
        waitingEmails: waitingEmails
    } })
    
}