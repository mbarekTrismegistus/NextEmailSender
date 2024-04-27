
import { NextResponse } from 'next/server';
import dynamic from 'next/dynamic';
import { renderAsync } from '@react-email/render';

const RESEND_API_KEY = "re_2XcUAh4k_LaTe5yeQzBDd5pZEA55JZpbp";

export const revalidate = 0

export async function POST(request) {
    
    let data = await request.json()
    let html
    if(data.data.template){
        let template = data.data.template
        const Email = dynamic(async() => await import(`../../../emails/${template}`))
        html = await renderAsync(<Email/>, {
            pretty: true
        })
    }
    else if(data.data.html){
        html = data.data.html
    }


    let res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
            from: "Acme <onboarding@resend.dev>",
            to: ["momoboogeyman2000@gmail.com"],
            subject: "hello world",
            html: html,
            }),
        });

    console.log(res)

    // await prisma.email.create({
    //     data: {
    //         template: data.data.template || "Html",
    //         sender: data.data.user.email,
    //         recievers: data.data.recievers,
    //         userId: data.data.user.id
    //     }
    // })

    return NextResponse.json({message: "ok sent"})

    
}