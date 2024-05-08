import { NextResponse } from 'next/server'
import readXlsxFile from 'read-excel-file'

export async function POST(request) {

    const file = await request.json()
    // console.log(file)


    
    return NextResponse.json(file)
    
}