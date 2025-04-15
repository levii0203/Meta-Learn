import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { setComponent } from "@/redux/slice/component"
import { Button } from "@heroui/react"
import { CompleteCourseFunction, CourseContract, WithdrawCourseFunction } from "@/app/contract/course"
import { setMyCourses } from "@/redux/slice/meta"
import { useEffect } from "react"
import { addNotification, removeNotification } from "@/redux/slice/notification"

export default function CourseVisit(){
    const currTitle = useAppSelector((state)=>state.meta.currTitle)||"";
    const currCourseId:any = useAppSelector((state)=>state.meta.currCourseId);
    const userId = useAppSelector((state)=>state.user.id)
    const notification = useAppSelector((state)=>state.notification.notify)
    const dispatch = useAppDispatch();
    async function handler(){
        let ind = notification.length;
        try{
            dispatch(addNotification("Please Wait"));
            await CompleteCourseFunction({courseId:currCourseId})
            await fetch('/api/complete',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({courseId:currCourseId})
            })
            dispatch(setMyCourses([]))
            dispatch(removeNotification(ind));
            dispatch(addNotification("Congratulations! Course Completed"))
        } 
        catch(err){
            dispatch(removeNotification(ind));
            console.log(err);
        }
    }
    async function withdrawHandler(){
        let ind = notification.length;
        try{
            dispatch(addNotification("Please Wait"));
            await WithdrawCourseFunction({courseId:currCourseId})
            await fetch('/api/withdraw',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({courseId:currCourseId, userId:userId})
            })
            dispatch(removeNotification(ind));
            dispatch(addNotification("Success! Course Withdrew"));
        } 
        catch(err){
            dispatch(removeNotification(ind));
            console.log(err);
        }
    }
    useEffect(()=>{
        async function get(){
            await fetch('/api/withdraw',{method:'GET'})
        }
    })
    return (
        <div className="h-full w-full flex flex-col">
            <div className="bg-zinc-800 h-fit items-center flex w-full py-2  justify-between ">
                <p className="text-md flex ml-[2%] w-full font-semibold">{currTitle}</p>
                <div className="w-full flex items-center mr-[3%] justify-end">
                    <Button className="pl-2 pr-4 py-2 rounded-md cursor-pointer hover:opacity-85 gap-2 border-2 text-sm border-gray-500" onPress={()=>dispatch(setComponent("StudentCourses"))}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" viewBox="0 0 1024 1024" version="1.1"><path d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z" className="fill-white"/></svg>
                        Go Back
                    </Button>
                </div>
            </div>
            <div className="w-full flex h-full">
                
            </div>
            <div className="bg-zinc-800 h-fit items-center flex w-full py-2  justify-between ">
                <div className="w-full flex items-center ml-[2%] justify-start">
                    <Button className="px-4 py-2 rounded-md cursor-pointer hover:opacity-85 gap-2 border-2 border-gray-500 font-medium" onPress={withdrawHandler}>
                        Withdraw Course
                    </Button>
                </div>
                <div className="w-full flex items-center mr-[2%] justify-end">
                    <Button className="px-4 py-2 rounded-md cursor-pointer hover:opacity-85 gap-2 font-medium bg-green-600" onPress={handler}>
                        Complete Course
                    </Button>
                </div>
            </div>
        </div>
    )
}

