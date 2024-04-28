import prisma from '@/prisma/client'
import { NextResponse } from 'next/server'

export async function GET(request) {


    return new Promise(async(resolve,reject) => {
        for(let i = 0; i < 20; i++){
            await prisma.schedule.create({
                data: {
                    template: "main",
                    sender: "momoboogeyman2000@gmail.com",
                    recievers: ["momoboogeyman2000@gmail.com"],
                    isSent: false,
                    userId: 3,
                    date: new Date().toISOString()
                }
            })
            console.log(i)
        }
        
    })

    
}