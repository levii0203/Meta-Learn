import dbRes from '@/postgres/postgres';
import { NextRequest, NextResponse } from 'next/server';

interface UserInterface{
    password?: string;
    email?: string;
}

export async function GET(req:NextRequest) {
    await dbRes.connect()
    .then(()=>{
        return NextResponse.json({message: "GET request: Database successfully connected."})
    })
    .catch(err=>{
        console.log(err)
        return NextResponse.json({message: "GET request: Error occurred while connecting to database."})
    });
    return NextResponse.json({ message: "GET request successful" });
}

export async function POST(req:NextRequest){
    try{
        const reqDaTa:UserInterface = await req.json();
        const {email,password} = reqDaTa;
        const checkUser = await dbRes.query(
            `SELECT * FROM users WHERE email = $1 AND password = $2`,
             [email,password]
        )
        if(checkUser.rows.length===0){
            return NextResponse.json({data:{message:"POST failed: User doesn't exist",meta:null}},{status:404});
        }
        return NextResponse.json({data:{message:"Login'd successfully" , meta:checkUser.rows[0]}},{status:200});

    }
    catch(error){
        return NextResponse.json({data:{message:"Login failed: "+error,meta:null}},{status:502});
    }
}