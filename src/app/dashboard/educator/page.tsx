"use client"
import React , {useEffect, useState} from "react";
import Components from "@/components/dashboard/student/components"
import NavBar from "@/components/navbar/navbar"
import { useRouter } from "next/navigation";
import AddCourse from "@/components/Course/add";
import { useAppSelector } from "@/redux/hook";



export default function Page(){
    const [activeComponent, setActiveComponent] = useState("Home");
    const email = useAppSelector((state)=>state.user.email);
    const router = useRouter();
    const renderComponent = () => {
        switch (activeComponent) {
            case "AddCourse": return <AddCourse/>
        }
    };
    useEffect(()=>{
        if(email===undefined){
            router.push('/login');
        }
    })
    return (
        <div className="h-screen relative flex-col w-screen scroll-m-0 flex overflow-x-hidden flex-1 overflow-y-auto">
            <NavBar/>
            <div className="h-full relative flex w-screen">
                <aside className="w-[225px] h-full flex py-4 bg-black">
                    <nav className="h-full w-full flex flex-col justify-start ml-2">
                        <ul className="flex flex-col gap-2 ml-2 items-center justify-center">
                            <li className="py-3 px-4 w-full hover:rounded-l-lg hover:bg-zinc-700 cursor-pointer hover:bg-blend-soft-light items-center justify-center font-medium focus:bg-white focus:text-black" onClick={()=>setActiveComponent("Dashboard")}><a href="#">Dashboard</a></li>
                            <li className="py-3 px-4 w-full hover:rounded-l-lg hover:bg-zinc-700 cursor-pointer hover:bg-blend-soft-light items-center justify-center font-medium"><a href="#">Courses</a></li>
                            <li className="py-3 px-4 w-full hover:rounded-l-lg hover:bg-zinc-700 cursor-pointer hover:bg-blend-soft-light items-center justify-center font-medium"><a href="#">Students</a></li>
                            <li className="py-3 px-4 w-full hover:rounded-l-lg hover:bg-zinc-700 cursor-pointer hover:bg-blend-soft-light items-center justify-center font-medium"><a href="#">Messages</a></li>
                            <li className="py-3 px-4 w-full hover:rounded-l-lg hover:bg-zinc-700 cursor-pointer hover:bg-blend-soft-light items-center justify-center font-medium"><a href="#">Assignments</a></li>
                            <li className="py-3 px-4 w-full hover:rounded-l-lg hover:bg-zinc-700 cursor-pointer hover:bg-blend-soft-light items-center justify-center font-medium" onClick={()=>setActiveComponent("Certifications")}><a href="#">Analytics</a></li>
                            <li className="py-3 px-4 w-full hover:rounded-l-lg hover:bg-zinc-700 cursor-pointer hover:bg-blend-soft-light items-center justify-center font-medium" onClick={()=>setActiveComponent("AddCourse")}><a href="#">Add and Delete</a></li>
                            <li className="py-3 px-4 w-full hover:rounded-l-lg hover:bg-zinc-700 cursor-pointer hover:bg-blend-soft-light items-center justify-center font-medium"><a href="#">Setting</a></li>
                            <li className="py-3 px-4 w-full hover:rounded-l-lg hover:bg-zinc-700 cursor-pointer hover:bg-blend-soft-light items-center justify-center font-medium"><a href="#">Help and Support</a></li>
                        </ul>
                    </nav>
                </aside>
                <Components>
                    {renderComponent()} 
                </Components>
            </div>
        </div>
    )
}