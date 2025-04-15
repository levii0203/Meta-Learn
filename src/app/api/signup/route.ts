import dbRes from '@/postgres/postgres';
import { NextRequest, NextResponse } from 'next/server';

interface UserData {
    firstname?: string;
    lastname?: string;
    password?: string;
    email?: string;
    address?: string;
    role?: string;
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

export async function POST(req: NextRequest) {
    try {
      const body: UserData = await req.json();
      const { firstname, lastname, password, email, address , role } = body;
        const checkIfUser = await dbRes.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
        );
      if (checkIfUser.rows.length > 0){
          return NextResponse.json({message: 'User already exists.'},{status:300})
      }
      await dbRes.query(
        `INSERT INTO users (firstname, lastname, password, email, address, role) VALUES ($1, $2, $3, $4, $5, $6)`,
        [firstname, lastname, password, email, address, role]
      );
  
      return NextResponse.json({ message: 'POST request successful: User added to the database.' }, { status: 200 });
    } catch (error) {
      console.error('Error in POST request:', error);
      return NextResponse.json(
        { message: 'POST request+ failed: Error occurred.' },
        { status: 500 }
      );
    }
}