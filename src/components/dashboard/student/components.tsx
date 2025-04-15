import { AnimatePresence , motion } from "framer-motion";
import React, { ReactNode , useEffect, useRef, useState } from "react";
import { Button } from "@heroui/react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addNotification, removeNotification } from "@/redux/slice/notification";


interface ComponentsProps {
    children: ReactNode;
}

export default function Components({ children }: ComponentsProps) {
    const load = useRef(false);
    const notifications = useAppSelector((state)=>state.notification.notify)
    const dispatch = useAppDispatch();
    useEffect(()=>{
        if(!load.current){
            dispatch(addNotification("hello"));
            load.current = true;
        }
    })
      
    return (
        <>
        <div className="flex-1 w-full h-full">
            {children}
      
        </div>
  
        </>
    );
}