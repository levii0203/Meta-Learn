import { Button } from "@heroui/react"
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { CheckCertificateFunction, MintCertificateFunction } from "@/app/contract/certificate";
import { addNotification, removeNotification } from "@/redux/slice/notification";

interface props {
    meta:any,
    cert_meta:any
}

export default function CertificationList({meta,cert_meta}:any){
        const address = useAppSelector((state)=>state.wallet.address);
        const notification = useAppSelector((state)=>state.notification.notify)
        const dispatch = useAppDispatch();
        async function handler(){
            let ind = notification.length;
            dispatch(addNotification("Please  Wait"));
            await MintCertificateFunction({courseId:meta.id});
            await fetch('/api/certificate/mint',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({courseId:meta.id})
            })
            dispatch(removeNotification(ind))
            dispatch(addNotification("Congrats! Certificated minted"));
        }
        async function checkCertHandler(){
            const res = await CheckCertificateFunction({courseId:meta.id,signer_address:address||""});
            console.log(res);
        }
    return (
        <div className="min-h-[68px] h-auto w-full py-2  flex flex-col">
        <div  className="w-full flex px-8 py-4 justify-between">
            <div className="flex w-full flex-col gap-2">
                <p className="flex text-wrap text-gray-300 font-semibold">{meta.title}</p>
                <p className="flex text-wrap text-sm">Educator Name</p>
            </div>
            <div className="w-full flex gap-3 justify-end">
            {cert_meta.completed? ( 
                <>
                 {cert_meta.certificated ? (
                        <>
                       <Button className="flex py-3 px-6 bg-zinc-800 hover:opacity-55 rounded-2xl text-base cursor-pointer text-wrap">Validate</Button>
                       <Button className="flex py-3 px-6 bg-green-800 text-base  rounded-2xl cursor-pointer text-wrap">Certificated</Button>
                        </>
                    ):(
                        <Button className="flex py-3 px-6 bg-zinc-800 text-base hover:opacity-55 rounded-2xl cursor-pointer text-wrap" onPress={handler}>Get certificate</Button>
                    )}
                    
                </>
            ):(<>
                 <Button className="flex py-3 px-6 bg-zinc-800 text-base hover:opacity-55 rounded-2xl cursor-pointer text-wrap">Ongoing</Button>
            </>)}
            </div>
        </div>
    </div>
    )
}