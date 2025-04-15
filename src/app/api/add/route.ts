import dbRes from '@/postgres/postgres';
import { NextRequest, NextResponse } from 'next/server';


interface courseInterface {
    educatorId?:number,
    price?:number,
    title?:string,
    description?:string,
}


export async function GET(req:NextRequest){
    await dbRes.connect()
    .then(()=>{
        return NextResponse.json({message: "GET request: Database successfully connected."})
    })
    .catch(err=>{
        return NextResponse.json({message: "GET request: Error occurred while connecting to database."})
    })
    return NextResponse.json({ message: "GET request successful" });
}

export async function POST(req:NextRequest){
    try {
        const reqData:courseInterface = await req.json();
        const {educatorId ,price ,title, description} = reqData;
        const queryText = `
            INSERT INTO courses (educator_id, price, title, description)
            VALUES ($1, $2, $3, $4)
            RETURNING id
        `;
        const queryParams = [educatorId, price, title, description];
        const data = await dbRes.query(queryText, queryParams);
        const dbId = data.rows[0]?.id;
        return NextResponse.json({data: {message: 'POST request successful: Course added to the database.' ,meta:dbId}}, { status: 200 });
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({data: {message:error,meta:null}},{status:500});
    }
}