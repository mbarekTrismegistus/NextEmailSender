
import { NextResponse } from 'next/server';
import dynamic from 'next/dynamic';
import { renderAsync } from '@react-email/render';



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