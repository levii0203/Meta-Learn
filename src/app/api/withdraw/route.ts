import { NextResponse , NextRequest } from "next/server";
import dbRes from "@/postgres/postgres";


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
        const reqData = await req.json();
        const {courseId,userId} = reqData;
        console.log(userId);
        const myCourses = await dbRes.query( `DELETE FROM user_courses WHERE user_id = $1 AND course_id = $2 `,[userId,courseId]);
        return NextResponse .json({message:"GET /api/courses: successful",meta:null,status:200})
    }
    catch(err){
        console.error(err);
        return NextResponse.json({message:"server failed",meta:null, status:502});
    }

}