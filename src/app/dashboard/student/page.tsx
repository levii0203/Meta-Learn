"use client"
import React , {useState, useEffect,useRef} from "react";
import Components from "@/components/dashboard/student/components"
import NavBar from "@/components/navbar/navbar"
import { useRouter } from "next/navigation";
import { AnimatePresence , motion } from "framer-motion";
import { addNotification, removeNotification } from "@/redux/slice/notification";
import { Button } from "@heroui/react";



import StudentDashboard from "@/components/dashboard/student/dashboard/dashboard";
import StudentDashboardCourses from "@/components/dashboard/student/courses";
import Certifications from "@/components/certification/certificates";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setComponent } from "@/redux/slice/component";
import CourseVisit from "@/components/Course/visit/visit";



export default function Page(){
    const activeComponent = useAppSelector((state)=>state.component.active);
    const email = useAppSelector((state)=>state.user.email);
    const router = useRouter();
    const dispatch = useAppDispatch();
      const load = useRef(false);
        const notifications = useAppSelector((state)=>state.notification.notify)
        useEffect(()=>{
            if(!load.current){
                dispatch(addNotification("hello"));
                load.current = true;
            }
        })
    const renderComponent = () => {
        switch (activeComponent) {
            case "StudentDashboard": return <StudentDashboard/>
            case "StudentCertifications": return <Certifications/>
            case "StudentCourses": return <StudentDashboardCourses/>
            case "VisitCourse": return <CourseVisit/>
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
            <div className="h-full flex w-screen">
                <aside className="w-[225px] h-full flex py-4 bg-black">
                    <nav className="h-full w-full flex flex-col justify-start ml-2">
                        <ul className="flex flex-col gap-2 ml-2 items-center justify-center">
                            <li className="py-3 px-4 w-full hover:rounded-l-lg hover:bg-zinc-700 cursor-pointer hover:bg-blend-soft-light items-center justify-center font-medium focus:bg-white focus:text-black" onClick={()=>dispatch(setComponent("StudentDashboard"))}><a href="#">Dashboard</a></li>
                            <li className="py-3 px-4 w-full hover:rounded-l-lg hover:bg-zinc-700 cursor-pointer hover:bg-blend-soft-light items-center justify-center font-medium"  onClick={()=>dispatch(setComponent("StudentCourses"))}><a href="#">Courses</a></li>
                            <li className="py-3 px-4 w-full hover:rounded-l-lg hover:bg-zinc-700 cursor-pointer hover:bg-blend-soft-light items-center justify-center font-medium"><a href="#">Assignments</a></li>
                            <li className="py-3 px-4 w-full hover:rounded-l-lg hover:bg-zinc-700 cursor-pointer hover:bg-blend-soft-light items-center justify-center font-medium"><a href="#">Achievements</a></li>
                            <li className="py-3 px-4 w-full hover:rounded-l-lg hover:bg-zinc-700 cursor-pointer hover:bg-blend-soft-light items-center justify-center font-medium"  onClick={()=>dispatch(setComponent("StudentCertifications"))}><a href="#">Certifications</a></li>
                            <li className="py-3 px-4 w-full hover:rounded-l-lg hover:bg-zinc-700 cursor-pointer hover:bg-blend-soft-light items-center justify-center font-medium"><a href="#">Setting</a></li>
                        </ul>
                    </nav>
                </aside>
                <Components>
                    {renderComponent()} 
                </Components>
            </div>
            <div className="fixed bottom-0 right-0 max-w-[300px] w-full z-50 p-4">
            <ul className=" flex flex-col ml-auto mt-full mt-[4%] gap-4 h-auto">
            <AnimatePresence initial={false} mode="popLayout">
                {notifications.map((notification, id) => (
                    <motion.li
                    key={id}
                    layout
                    initial={{ opacity: 0, y: 50, scale: 0.3 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                    >
                    <div className="w-full max-w-[250px] rounded-2xl bg-white flex flex-col shadow-lg overflow-hidden">
                        <div className="flex items-center justify-between p-3">
                        <p className="text-base font-semibold text-gray-800">
                            {notification || "New Notification!"}
                        </p>
                        <Button
                            onPress={() => dispatch(removeNotification(id))}
                            className="flex p-1 cursor-pointer text-gray-500 hover:text-gray-800"
                        >
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24px"
                            height="24px"
                            viewBox="0 0 24 24"
                            fill="none"
                            >
                            <path
                                d="M16 8L8 16M8.00001 8L16 16"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            </svg>
                        </Button>
                        </div>
                        {(notification!=="Please Wait")?(
                            <div className="w-full h-2 bg-gray-200">
                            <motion.div
                                className="h-full bg-green-500"
                                initial={{ width: "100%" }}
                                animate={{ width: "0%" }}
                                transition={{ duration: 5, ease: "linear" }}
                                onAnimationComplete={() => dispatch(removeNotification(id))}
                            />
                            </div>
                        ):(<></>)}
                    </div>
                    </motion.li>
                ))}
            </AnimatePresence>
            </ul>
            </div>
        </div>
    )
}
