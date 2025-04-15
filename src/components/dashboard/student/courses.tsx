import { useEffect, useState, useRef} from "react";
import MyCourseCard from "./mycourse";
import BuyCourseCard from "./buycourses";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setCourses, setMyCourses } from "@/redux/slice/meta";

export default function StudentDashboardCourses(){
    const load = useRef(false);
    const courses = useAppSelector((state)=>state.meta.courses);
    const myCourses = useAppSelector((state)=>state.meta.myCourses);
    const userId = useAppSelector((state)=>state.user.id);
    const dispatch = useAppDispatch();
    const language =[
        {key: "en", label: "English"},
    ]
    useEffect(()=>{
        async function thisCourses(){
            try{
            const req = await fetch('/api/courses',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({userId:userId})})
            const data = await req.json();
            console.log(data.meta);
            dispatch(setMyCourses(data.meta));
            }
            catch(error){
            console.error(error);
            }
        }
        async function getCourses(){
            try{
                const req = await fetch('/api/courses',{method:'GET'});
                const data = await req.json();
                console.log(data.meta);
                dispatch(setCourses(data.meta));
                
            } 
            catch(error){
                console.error(error);
            }
        }
        async function handler(){
            if(!load.current || !courses.length || !myCourses.length){
                await getCourses();
                await thisCourses();
                load.current = true;
            }
        }
        handler()
    },[])

    return (
        <div className="h-full w-full gap-8 py-4 flex flex-col">
            <div className="flex  justify-between w-full px-8">
                <div className="flex w-full items-center gap-6">
                    <p className="flex min-w-fit font-semibold text-lg">What do you wanna learn?.</p>
                    <form className="flex items-center min-w-[360px] w-full mx-auto">   
                        <label htmlFor="simple-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
                                </svg>
                            </div>
                            <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search course..." required />
                        </div>
                        <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </form>
                </div>
               
                <div className="w-full justify-end items-center flex">
                   
                </div>

            </div>
            <div className="flex w-full gap-6 flex-col px-8">
                <p className="flex w-full font-semibold text-lg">My Courses</p>
                <div className="w-full gap-4 flex flex-wrap">
                    {myCourses.map((course)=>{
                        return <MyCourseCard meta={course}/>
                    })}
                </div>
            </div>
            <div className="flex w-full gap-6 pb-12  flex-col px-8">
                <p className="flex w-full font-semibold text-lg">Get started with these courses</p>
                <div className="w-full flex-wrap gap-x-8 gap-y-6 rap flex">
                    {courses.map((course)=>{
                        return <BuyCourseCard meta={course}/>
                    })}
                </div>
            </div>
           

        <footer className="bg-white rounded-lg shadow-sm dark:bg-gray-900 m-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
                <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Meta Learn</span>
                </a>
                <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">About</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Contact</a>
                </li>
                </ul>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.</span>
            </div>
        </footer>



        </div>
    )
}