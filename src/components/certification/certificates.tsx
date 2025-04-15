import React , {useEffect, useRef, useState} from "react";
import CharactersRemaining from "../random/searchframer";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setCertCourses, setCertMeta} from "@/redux/slice/meta";
import CertificationList from "./list";


export default function Certifications(){
    const certCourses = useAppSelector((state)=>state.meta.certCourses);
    const cert_meta = useAppSelector((state)=>state.meta.cert_meta);
    const userId = useAppSelector((state)=>state.user.id);
    const dispatch = useAppDispatch();
    const load = useRef(false);

    useEffect(()=>{
            async function thisCourses(){
                try{
                const req = await fetch('/api/certificate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({userId:userId})})
                const data = await req.json();
                dispatch(setCertCourses(data.meta));
                dispatch(setCertMeta(data.user_meta));
                console.log(data.user_meta);
                }
                catch(error){
                console.error(error);
                }
            }
            async function handler(){
                if(cert_meta.length===0 || !load.current || !certCourses.length){
                    await fetch('/api/certificate',{method:'GET'})
                    await thisCourses();
                    load.current = true;
                }
            }
            handler()
        },[])
    return (
        <div className="w-full h-full flex-1 flex overflow-y-auto items-start flex-col  py-8">
            <div className="px-8 pb-4 flex w-full justify-between">
                <div className="flex w-full items-center gap-8">
                    <h1 className="text-xl font-semibold">Courses</h1>
                     <CharactersRemaining className="max-w-[300px] border-2 border-gray-600 rounded-xl h-[40px] w-full" inputClassName="w-full border-2 border-gray-500 outline-0 placeholder:text-normal  placeholder:text-gray-400 h-full"/>
                </div>
                <h1 className="text-xl font-semibold ">Certificates</h1>
            </div>
            {certCourses.map((course,key)=>{
                return <CertificationList key={key} meta = {course} cert_meta = {cert_meta[key]}/>
            })}


        </div>
    )
}