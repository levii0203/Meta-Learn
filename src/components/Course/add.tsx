"use client"
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react"
import AddCourseSetting from "./addCourse";


export default function AddCourse(){
    const [add,setAdd] = useState(false);
    return (
        <>
         <AnimatePresence mode="wait" initial={false}>
                {add ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        key="add-course-setting"
                    >
                        <AddCourseSetting setAdd={setAdd}/>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        <div className="w-full h-full flex-1 py-8 flex-col gap-4">
            <div className="w-full h-fit flex px-8 py-4 justify-between shadow-md shadow-gray-800 items-center hover:cursor-pointer hover:opacity-65" onClick={()=>setAdd(true)}>
               <h1 className="font-medium text-white text-lg">Add Course</h1>
               <h1 className="font-semibold text-white text-2xl">+</h1>
            </div>
            <div className="w-full h-fit flex px-8 py-4 justify-between shadow-md shadow-gray-800 items-center hover:cursor-pointer hover:opacity-65">
               <h1 className="font-medium text-white text-lg">Delete Course</h1>
               <h1 className="font-semibold text-white text-2xl">+</h1>
            </div>
        </div>
        </>
    )
}