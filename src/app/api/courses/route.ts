import { NextResponse , NextRequest } from "next/server";
import dbRes from "@/postgres/postgres";



export async function GET(){
    try {
            await dbRes.connect()
            .catch(err=>{
                console.error(err);
                return NextResponse.json({message:"server failed",meta:null, status:502});
            })
        const courses = await dbRes.query( `SELECT * FROM courses`);
        return NextResponse .json({message:"GET /api/courses: successful",meta:courses.rows,status:200})
    }
    catch(err){
        console.error(err);
        return NextResponse.json({message:"server failed",meta:null, status:502});
    }
}

export async function POST(req:NextRequest){
    try{
       
        const reqData = await req.json();
        const {userId} = reqData;
        const myCourses = await dbRes.query(  `
           SELECT * FROM user_courses WHERE user_id = $1
`,[userId]);
        const courseIds = myCourses.rows.map(row => row.course_id);

        if (courseIds.length === 0) {
        return NextResponse.json({
            message: "User has no courses.",
            meta: [],
            status: 200,
        });
        }
        const courseDetails = await dbRes.query(
            `SELECT * FROM courses WHERE id = ANY($1::int[])`,
            [courseIds]
        );

        return NextResponse .json({message:"GET /api/courses: successful",meta:courseDetails.rows,status:200})
    }
    catch(err){
        console.error(err);
        return NextResponse.json({message:"server failed",meta:null, status:502});
    }
}

