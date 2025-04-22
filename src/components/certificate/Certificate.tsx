import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { useEffect, useState , useRef } from "react";
import { Form , Input , Button } from "@heroui/react";
import { addNotification } from "@/redux/slice/notification";
import { CheckCertificateCourseIdFunction } from "@/app/contract/certificate";
import { setComponent } from "@/redux/slice/component";

interface prop{
    meta:{
        title:string,
        educator_id:number
    }
}

export default function Certificate(){
    const [allow,setAllow] = useState(false);
    const firstname = useAppSelector((state)=>state.user.firstName);
    const lastname = useAppSelector((state)=>state.user.lastName);
    const currCourse = useAppSelector((state)=>state.meta.currCourse);
    const [tokenId,setTokenId] = useState(-1);
    const dispatch = useAppDispatch();

    useEffect(()=>{
        async function handler(){
            if((tokenId<4444 || typeof tokenId!=='number') && tokenId!==-1){
                dispatch(addNotification("Please enter a valid token ID"))
            }
            else if(tokenId>=4444){
                const res = await CheckCertificateCourseIdFunction({tokenId:tokenId});
                if(parseInt(res)===currCourse.id) setAllow(true);
                else{
                    dispatch(addNotification("Oops! Invalid token id"));
                }
            }
        }
        handler();
    },[tokenId])

   
    return (
        <>
        {allow ? (
            <div className="h-full w-full bg-black px-[9%] py-[6%] items-center justify-center flex">
                <div className="border-2 h-full flex-col items-center gap-8 w-full rounded-2xl border-zinc-600 flex py-12 px-12">
                    <p className="text-xl font-semibold font-serif text-white">META LEARN::{tokenId}: <span className="tracking-widest">Certificate of Completion</span></p>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#FFFFFF" version="1.1" id="Capa_1" width="200px" height="200px" viewBox="0 0 506.812 506.812" xmlSpace="preserve">
                    <g>
                        <g id="Layer_2_28_">
                            <polygon points="96.428,396.844 0,396.844 0,444.656 73.928,444.656   "/>
                            <polygon points="442.447,444.656 506.812,444.656 506.812,396.844 419.946,396.844   "/>
                            <polygon points="127.927,329.906 38.25,329.906 38.25,377.719 105.427,377.719   "/>
                            <polygon points="410.948,377.719 468.562,377.719 468.562,329.906 388.448,329.906   "/>
                            <polygon points="159.426,262.969 86.062,262.969 86.062,310.781 136.925,310.781   "/>
                            <polygon points="379.449,310.781 420.75,310.781 420.75,262.969 356.949,262.969   "/>
                            <polygon points="190.925,196.031 133.875,196.031 133.875,243.844 168.424,243.844   "/>
                            <polygon points="347.951,243.844 372.938,243.844 372.938,196.031 325.45,196.031   "/>
                            <polygon points="217.929,138.656 221.754,130.509 226.928,119.531 229.5,119.531 229.5,81.281 286.875,81.281 286.875,119.531     289.447,119.531 294.621,130.509 298.445,138.656 316.452,176.906 353.812,176.906 344.25,138.656 325.125,138.656     325.125,81.281 344.25,81.281 344.25,43.031 172.125,43.031 172.125,81.281 191.25,81.281 191.25,138.656 172.125,138.656     162.562,176.906 199.923,176.906   "/>
                            <polygon points="421.314,444.656 398.813,396.844 389.815,377.719 367.314,329.906 358.316,310.781 335.815,262.969     326.808,243.844 304.317,196.031 295.31,176.906 277.312,138.656 239.062,138.656 221.066,176.906 212.058,196.031     189.567,243.844 180.559,262.969 158.059,310.781 149.06,329.906 126.56,377.719 117.562,396.844 95.061,444.656 86.062,463.781     430.312,463.781   "/>
                        </g>
                    </g>
                    </svg>  
                    <div className="flex gap-4 items-center justify-center flex-wrap">
                        <p className="text-lg text-zinc-400 mb-2">This is to certify that</p>
                        <h2 className="text-4xl font-bold text-white mb-4">{firstname+" "+lastname}</h2>
                        <p className="text-lg text-zinc-400 mb-6">has successfully completed</p>

                        <h3 className="text-2xl font-semibold text-white mb-4">{currCourse.title} id:{currCourse.id}</h3>
                        <p className="text-lg text-zinc-400 mb-6">by</p>

                        <h3 className="text-2xl font-semibold text-white mb-4">id:{currCourse.educator_id}</h3>
                        <p className="text-md text-zinc-400 max-w-md mx-auto">
                            Awarded for outstanding dedication and consistency in following this course.
                        </p>
                    </div>
                    <div className="flex mt-[3%] justify-center items-center w-full">
                        <p className="text-sm text-zinc-400 max-w-md mx-auto">
                            Minted on and verified by <span className="text-blue-500">Ethereum</span>
                        </p>
                    </div>
                </div>
            </div>
        ):(
            <>
            <div className="h-full w-full flex  items-center justify-center">
            <div className="w-full mb-[6%] flex-col justify-start gap-6 flex max-w-xs" onSubmit={()=>dispatch(setComponent("Certificate"))}>
                <p>One final step</p>
                <Input
                    isRequired
                    errorMessage="Please enter a token ID"
                    labelPlacement="outside-left"
                    name="email"
                    placeholder="Enter your certificate token id"
                    className="flex"
                    onChange={(e)=>setTokenId(parseInt(e.target.value))}
                />
            </div>

            </div>
            </>
        )}
        </>
    )
}