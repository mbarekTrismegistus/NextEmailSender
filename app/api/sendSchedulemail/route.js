
import { NextResponse } from 'next/server';
import dynamic from 'next/dynamic';
import { renderAsync } from '@react-email/render';
import prisma from '@/prisma/client';

const RESEND_API_KEY = process.env.RESEND_API_KEY;

export const revalidate = 0

export async function POST(request) {
    
    let data = await request.json()

    let html
    if(data.data.template != "html"){
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
            from: process.env.MAIN_MAIL,
            to: data.data.recievers,
            subject: data.data.subject,
            html: html,
            }),
        });
        

    await prisma.schedule.delete({
        where: {
            id: data.data.id
        }
    })
  

    await prisma.email.create({
        data: {
            template: data.data.template || "Html",
            sender: data.data.user.name,
            recievers: data.data.recievers,
            userId: data.data.user.id,
            subject: data.data.subject
        }
    })

    return NextResponse.json({message: "ok sent"})

    
}