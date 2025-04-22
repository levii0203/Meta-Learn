import React , {useEffect, useRef, useState} from "react";
import CharactersRemaining from "../random/searchframer";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setCertCourses, setCertMeta} from "@/redux/slice/meta";
import CertificationList from "./list";


export default function Certifications(){
    const certCourses = useAppSelector((state)=>state.meta.certCourses);
    const cert_meta = useAppSelector((state)=>state.meta.cert_meta);
    const userId = useAppSelector((state)=>state.user.id);
    const dispatch = useAppDispatch();
    const load = useRef(false);
    const [validate,setValidate] = useState(-1);
    const [isVisible, setIsVisible] = useState(true);
    const [flashIcon , setFlashIcon] = useState(true);
    const [tokenId,setTokeId] = useState(-1);

    useEffect(()=>{
            async function thisCourses(){
                try{
                const req = await fetch('/api/certificate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({userId:userId})})
                const data = await req.json();
                dispatch(setCertCourses(data.meta));
                dispatch(setCertMeta(data.user_meta));
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
        <div className="w-full h-full flex-1 flex overflow-y-auto items-start flex-col">
            <div className="px-8 pb-4 flex w-full justify-between">
                <div className="flex w-full items-center gap-8">
                    <h1 className="text-xl font-semibold">Courses</h1>
                     <CharactersRemaining className="max-w-[300px] border-2 border-gray-600 rounded-xl h-[40px] w-full" inputClassName="w-full border-2 border-gray-500 outline-0 placeholder:text-normal  placeholder:text-gray-400 h-full"/>
                </div>
                <h1 className="text-xl font-semibold ">Certificates</h1>
            </div>
            {certCourses.map((course,key)=>{
                return <CertificationList key={key} meta = {course} cert_meta = {cert_meta[key]}setValidate={setValidate} setTokeId={setTokeId} index={key}/>
            })}
            {(validate!==-1)?(
                 
                <div className="absolute h-full z-100 w-screen flex-col items-center bg-zinc-900 opacity-90 justify-center">
                    <AnimatePresence>
                        {isVisible && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                      
                    <div className="flex items-center max-w-[360px] w-full pt-4 pb-8 h-fit mt-[4%] rounded-lg justify-center bg-black mx-auto ml-[calc(20%)] flex-col px-8">
                        <div className="flex w-full h-6 justify-end">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 32 32" className="fill-gray-300 cursor-pointer" onClick={async()=>{setValidate(-1)}}>
                                <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5  c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4  C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z"/>
                            </svg>
                        </div>
                        <div className="flex w-full gap-6 flex-col h-full items-center justify-center">
                            <p className="flex text-lg font-semibold">Validate Certificate</p>
                            <AnimatePresence>
                                {flashIcon && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{
                                    opacity: [1, 0, 1], // Clear on/off flash
                                    transition: {
                                        duration: 2, // One flash cycle (on-off-on)
                                        repeat: Infinity, // Repeat forever
                                        ease: "linear", // Sharp transitions for distinct flashes
                                    },
                                    }}
                                    exit={{ opacity: 0, transition: { duration: 2 } }} // Fade out on unmount
                                >
                                
                                <div className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="80px" height="80px" viewBox="0 0 24 24" fill="none">
                                    <path d="M9 18.5H15M7 15H17M5 2H19C20.1046 2 21 2.99492 21 4.22222V19.7778C21 21.0051 20.1046 22 19 22H5C3.89543 22 3 21.0051 3 19.7778V4.22222C3 2.99492 3.89543 2 5 2ZM11.9976 6.21194C11.2978 5.4328 10.1309 5.22321 9.25414 5.93667C8.37738 6.65013 8.25394 7.84299 8.94247 8.6868C9.631 9.53061 11.9976 11.5 11.9976 11.5C11.9976 11.5 14.3642 9.53061 15.0527 8.6868C15.7413 7.84299 15.6329 6.64262 14.7411 5.93667C13.8492 5.23072 12.6974 5.4328 11.9976 6.21194Z" className="stroke-gray-300" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                                </motion.div>)}
                                </AnimatePresence>
                            <div className="flex justify-between w-2xs items-center">
                                <p className="flex">Token ID</p>
                                <div className="flex w-fit gap-4 ring-1 rounded-xl ring-zinc-600 py-2 px-4">
                                    {(tokenId!==-1)?(
                                        <>
                                        <p className="flex text-sm text-gray-400">{tokenId}</p>
                                        <svg width="22px" height="22px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer">
                                        <path d="M8.25005 8.5C8.25005 8.91421 8.58584 9.25 9.00005 9.25C9.41426 9.25 9.75005 8.91421 9.75005 8.5H8.25005ZM9.00005 8.267H9.75006L9.75004 8.26283L9.00005 8.267ZM9.93892 5.96432L10.4722 6.49171L9.93892 5.96432ZM12.2311 5V4.24999L12.2269 4.25001L12.2311 5ZM16.269 5L16.2732 4.25H16.269V5ZM18.5612 5.96432L18.0279 6.49171V6.49171L18.5612 5.96432ZM19.5 8.267L18.75 8.26283V8.267H19.5ZM19.5 12.233H18.75L18.7501 12.2372L19.5 12.233ZM18.5612 14.5357L18.0279 14.0083L18.5612 14.5357ZM16.269 15.5V16.25L16.2732 16.25L16.269 15.5ZM16 14.75C15.5858 14.75 15.25 15.0858 15.25 15.5C15.25 15.9142 15.5858 16.25 16 16.25V14.75ZM9.00005 9.25C9.41426 9.25 9.75005 8.91421 9.75005 8.5C9.75005 8.08579 9.41426 7.75 9.00005 7.75V9.25ZM8.73105 8.5V7.74999L8.72691 7.75001L8.73105 8.5ZM6.43892 9.46432L6.97218 9.99171L6.43892 9.46432ZM5.50005 11.767H6.25006L6.25004 11.7628L5.50005 11.767ZM5.50005 15.734L6.25005 15.7379V15.734H5.50005ZM8.73105 19L8.72691 19.75H8.73105V19ZM12.769 19V19.75L12.7732 19.75L12.769 19ZM15.0612 18.0357L14.5279 17.5083L15.0612 18.0357ZM16 15.733H15.25L15.2501 15.7372L16 15.733ZM16.75 15.5C16.75 15.0858 16.4143 14.75 16 14.75C15.5858 14.75 15.25 15.0858 15.25 15.5H16.75ZM9.00005 7.75C8.58584 7.75 8.25005 8.08579 8.25005 8.5C8.25005 8.91421 8.58584 9.25 9.00005 9.25V7.75ZM12.7691 8.5L12.7732 7.75H12.7691V8.5ZM15.0612 9.46432L15.5944 8.93694V8.93694L15.0612 9.46432ZM16.0001 11.767L15.2501 11.7628V11.767H16.0001ZM15.2501 15.5C15.2501 15.9142 15.5858 16.25 16.0001 16.25C16.4143 16.25 16.7501 15.9142 16.7501 15.5H15.2501ZM9.75005 8.5V8.267H8.25005V8.5H9.75005ZM9.75004 8.26283C9.74636 7.60005 10.0061 6.96296 10.4722 6.49171L9.40566 5.43694C8.65985 6.19106 8.24417 7.21056 8.25006 8.27117L9.75004 8.26283ZM10.4722 6.49171C10.9382 6.02046 11.5724 5.75365 12.2352 5.74999L12.2269 4.25001C11.1663 4.25587 10.1515 4.68282 9.40566 5.43694L10.4722 6.49171ZM12.2311 5.75H16.269V4.25H12.2311V5.75ZM16.2649 5.74999C16.9277 5.75365 17.5619 6.02046 18.0279 6.49171L19.0944 5.43694C18.3486 4.68282 17.3338 4.25587 16.2732 4.25001L16.2649 5.74999ZM18.0279 6.49171C18.494 6.96296 18.7537 7.60005 18.7501 8.26283L20.25 8.27117C20.2559 7.21056 19.8402 6.19106 19.0944 5.43694L18.0279 6.49171ZM18.75 8.267V12.233H20.25V8.267H18.75ZM18.7501 12.2372C18.7537 12.8999 18.494 13.537 18.0279 14.0083L19.0944 15.0631C19.8402 14.3089 20.2559 13.2894 20.25 12.2288L18.7501 12.2372ZM18.0279 14.0083C17.5619 14.4795 16.9277 14.7463 16.2649 14.75L16.2732 16.25C17.3338 16.2441 18.3486 15.8172 19.0944 15.0631L18.0279 14.0083ZM16.269 14.75H16V16.25H16.269V14.75ZM9.00005 7.75H8.73105V9.25H9.00005V7.75ZM8.72691 7.75001C7.6663 7.75587 6.65146 8.18282 5.90566 8.93694L6.97218 9.99171C7.43824 9.52046 8.07241 9.25365 8.73519 9.24999L8.72691 7.75001ZM5.90566 8.93694C5.15985 9.69106 4.74417 10.7106 4.75006 11.7712L6.25004 11.7628C6.24636 11.1001 6.50612 10.463 6.97218 9.99171L5.90566 8.93694ZM4.75005 11.767V15.734H6.25005V11.767H4.75005ZM4.75006 15.7301C4.73847 17.9382 6.51879 19.7378 8.72691 19.75L8.7352 18.25C7.35533 18.2424 6.2428 17.1178 6.25004 15.7379L4.75006 15.7301ZM8.73105 19.75H12.769V18.25H8.73105V19.75ZM12.7732 19.75C13.8338 19.7441 14.8486 19.3172 15.5944 18.5631L14.5279 17.5083C14.0619 17.9795 13.4277 18.2463 12.7649 18.25L12.7732 19.75ZM15.5944 18.5631C16.3402 17.8089 16.7559 16.7894 16.75 15.7288L15.2501 15.7372C15.2537 16.3999 14.994 17.037 14.5279 17.5083L15.5944 18.5631ZM16.75 15.733V15.5H15.25V15.733H16.75ZM9.00005 9.25H12.7691V7.75H9.00005V9.25ZM12.7649 9.24999C13.4277 9.25365 14.0619 9.52046 14.5279 9.99171L15.5944 8.93694C14.8486 8.18282 13.8338 7.75587 12.7732 7.75001L12.7649 9.24999ZM14.5279 9.99171C14.994 10.463 15.2537 11.1001 15.2501 11.7628L16.75 11.7712C16.7559 10.7106 16.3402 9.69106 15.5944 8.93694L14.5279 9.99171ZM15.2501 11.767V15.5H16.7501V11.767H15.2501Z" strokeWidth={2} className="fill-gray-100 opacity-75"/>
                                        </svg>
                                        </>
                                    ):(
                                        <p className="text-sm text-red-700">ERROR:404</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    </motion.div>
                                    )}

                                </AnimatePresence>
                </div>
               
            ):(<></>)}

        </div>
    )
}