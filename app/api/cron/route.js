import prisma from '@/prisma/client'

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0


export async function GET() {

    let d = await prisma.schedule.findMany({
        include: {
            user: true
        },
        where: {
            isSent: false
        }
    })

    d.forEach(async(e) => {
        await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
            from: "Acme <onboarding@resend.dev>",
            to: ["momoboogeyman2000@gmail.com"],
            subject: "hello world",
            html: "html",
            }),
        });
    })
    
    return NextResponse.json({message: "ok"});

}