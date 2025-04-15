"use client"
import {Card, CardHeader, CardBody, Badge, Button} from "@heroui/react";
import { useAnimate } from "motion/react"
import { useEffect, useRef } from "react"
import {Snippet} from "@heroui/snippet";
import { CountNumber } from "@/components/random/count";
import Pending from "../pending";
import { useAppSelector } from "@/redux/hook";
import PerformanceStudent from "../perfornance";

export default function StudentDashboard(){
    const [motionRef, animate] = useAnimate()
    const balance = useAppSelector((state)=>state.wallet.balance)
    useEffect(() => {
        const motionElement = motionRef.current
        const motionAnimation = animate(
            motionElement,
            { backgroundColor: ["#ff0088", "#0d63f8"] },
            {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
            }
        )
        return () => {
            motionAnimation.cancel()
        }
        motionAnimation()
    }, [])
    const chipColor = "danger"| undefined;
    const countColor = {
        fontSize: 30,
        color: "#05df72"
    }
    return (
        <div className="h-full gap-4 pb-8 px-8 flex flex-col w-full">
            <h1 className="font-semibold text-xl">Dashboard</h1>
            <div className="w-full flex flex-wrap items-center  gap-4 h-fit py-4">
                <Card className="max-w-[200px] p-2 w-full rounded-md bg-[#ff0088]"  ref={motionRef}>
                    <CardHeader className="justify-between">
                        <h1 className="text-normal text-gray-100 font-medium">Your wallet Balance</h1>
                    </CardHeader>
                    <CardBody className="flex flex-row gap-2">
                        <p1 className="text-xl text-white font-bold">{parseFloat(balance)}</p1>
                        <p1 className="text-lg text-white font-semibold mt-1">ETH</p1>
                    </CardBody>
                </Card>
                <Card className="max-w-[220px] p-2 w-full border-2 border-gray-500 rounded-md">
                    <CardHeader className="justify-between">
                        <h1 className="text-normal text-gray-100 font-medium">Attendance</h1>
                        <h1 className="text-sm text-red-500 font-light">-3.4%</h1>
                    </CardHeader>
                    <CardBody className="flex flex-row gap-2 justify-between">
                        <p className="font-bold flex text-green-400 text-xl items-center gap-1"><CountNumber cnt={70} text={countColor}/>%</p>
                        <p className="font-light text-sm text-gray-500 mt-4">3 months</p>
                    </CardBody>
                </Card>
                <Card className="max-w-[220px] p-2 w-full border-2 border-gray-500 rounded-md">
                    <CardHeader className="justify-between">
                        <h1 className="text-normal text-gray-100 font-medium">Total Active Courses</h1>
                    </CardHeader>
                    <CardBody className="flex flex-row gap-2 justify-between">
                        <p className="font-bold text-green-400 ml-8 text-3xl">4</p>
                        <p className="font-light text-sm text-gray-500 mt-4">0 completed</p>
                    </CardBody>
                </Card>
                {/*<Card className="max-w-[480px] p-2 w-full bg-blue-700 rounded-md">
                    <CardHeader className="justify-between">
                        <h1 className="text-normal text-gray-100 font-medium">Account Details</h1>
                    </CardHeader>
                    <CardBody className="flex flex-row gap-4 justify-between items-center">
                        <Snippet className="text-white truncate">0x5B38Da6a701c568545dCfcB03FcB875f56beddC4</Snippet>
                        <Button className="text-sm py-2 px-2 rounded-md bg-gray-100 text-black font-light hover:opacity-85 cursor-pointer">Copy</Button>
                    </CardBody>
                </Card>*/}
            </div>
             <div className="w-full gap-4 flex h-full items-start">
                <PerformanceStudent/>
                 <Pending/>
            </div>
            

        </div>
    )
}