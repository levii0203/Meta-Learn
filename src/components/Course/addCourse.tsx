"use client"
import React , {useEffect, useRef, useState} from "react";
import { Button } from "@heroui/react";
import AddCourseComponents from "./add/component";
import AddSetting from "./add/setting";
import AddHome from "./add/home";
import { AddCourseFunction } from "@/app/contract/course";
import { ethers } from "ethers";

interface props {
    setAdd: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormData {
    educatorId?: number;
    price?:number;
    title?: string;
    description?: string;
}
  
  
interface response {
    data:{
        message:string|null,
        meta:any
    },
}
interface add {
    courseId:number,
    price:number
}
const AddCourseSetting:React.FC<props>=({setAdd})=>{
        const load = useRef(false);
        const [title , setTitle] = useState<string|undefined>(undefined);
        const [description , setDescription] = useState<string|undefined>(undefined);
        const [educatorId , setEducatorId] = useState<number|undefined>(undefined);
        const [price , setPrice] = useState<number|undefined>(undefined);
        const [courseId,setCourseId] = useState<number|null>(null);
        const [activeComponent, setActiveComponent] = useState("home");
        const renderComponent = () => {
            switch (activeComponent) {
                case "setting": return <AddSetting setEducatorId={setEducatorId} setPrice={setPrice} setTitle={setTitle} setDescription={setDescription}/>
                case "home": return <AddHome/>
            }
        };

        async function DbAdd(data: FormData) {
            try{
                const res = await fetch('/api/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                })
                const r = await res.json();
                setCourseId(r.data.meta);
            } 
            catch(err){
                console.log(err);
            }
            
        }

        async function SaveHandler(){
            const data:FormData={
                educatorId:educatorId,
                price:price,
                title:title,
                description:description
            };
            await DbAdd(data);
        }

        async function AddHandler(){
            console.log(courseId);
            const detail:add={
                courseId:courseId||1,
                price:price||0
            }
            await AddCourseFunction(detail)
        }
        useEffect(()=>{
            async function dbConnect(){
                const res = await fetch('/api/add',{method:'GET'});
                const r:{message:string} = await res.json();
                console.log(r.message);
            }
            if(!load.current){
                dbConnect();
                load.current = true;
            }
        })
    return (
        <div className="absolute z-50 h-full w-full flex bg-[rgb(0 0 0.5)]">
            <div className="bg-[#343541] rounded-2xl h-[calc(70%)] w-full ml-[14%] min-w-[600px] max-w-[calc(50%)] flex flex-col">
                <div className="h-6 w-full flex items-center bg-zinc-900 justify-between py-2">
                    <div className="w-full h-full gap-2 flex items-center">
                        <div className="flex h-4 w-4 bg-white rounded-full"></div>
                        <div className="flex h-4 w-4 bg-blue-700 rounded-full"></div>
                    </div>  
                    <div className="w-full h-full flex items-center justify-center">
                        <p className="font-semibold text-base">Add course</p>
                    </div>
                    <div className="w-full h-full flex items-center justify-end mr-[1%]">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" height="15px" width="15px" version="1.1" id="Capa_1" viewBox="0 0 208.891 208.891" xmlSpace="preserve" onClick={()=>setAdd(false)} className="cursor-pointer fill-gray-300">
                        <path d="M0,170l65.555-65.555L0,38.891L38.891,0l65.555,65.555L170,0l38.891,38.891l-65.555,65.555L208.891,170L170,208.891  l-65.555-65.555l-65.555,65.555L0,170z"/>
                        </svg>
                    </div>
                </div>
                <div className="h-full w-full flex">
                    <aside className="w-[152px] h-full  flex py-4 bg-black">
                        <ul className="flex flex-col w-full mt-4 gap-2 ml-2 items-center">
                            <li className="py-3 px-4 w-full hover:rounded-l-lg hover:bg-zinc-700 cursor-pointer hover:bg-blend-soft-light items-center justify-center font-medium" onClick={()=>setActiveComponent("setting")}>Setting</li>
                        </ul>
                    </aside>
                         <AddCourseComponents>
                                {renderComponent()} 
                        </AddCourseComponents>
                </div>
                <div className="h-16 w-full flex bg-zinc-900 justify-between">
                    <div className="w-full h-full flex">
                        
                    </div>
                    <div className="w-full h-full px-4 items-center gap-4 justify-end flex">
                        <Button className="py-4 px-4 flex rounded-lg bg-gray-400 hover:opacity-85 cursor-pointer" onPress={SaveHandler}>Save</Button>
                        <Button className="py-4 px-4 flex rounded-lg bg-blue-600 hover:opacity-85 cursor-pointer" onPress={AddHandler}>Add</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddCourseSetting;