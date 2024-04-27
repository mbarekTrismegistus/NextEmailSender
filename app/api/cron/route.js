import prisma from '@/prisma/client'

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "edge";
export const revalidate = 0

const RESEND_API_KEY = "re_2XcUAh4k_LaTe5yeQzBDd5pZEA55JZpbp";

export async function GET() {

    let d = await prisma.schedule.findMany({
        include: {
            user: true
        },
        where: {
            isSent: false
        }
    })

    
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
            html: "edge runtim",
            }),
        });

    
    return NextResponse.json({message: "ok"});

}