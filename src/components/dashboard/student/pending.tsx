"use client";
import { Alert ,Button} from "@heroui/react";

export default function Pending() {

    return (
        <div className="flex w-[300px] flex-col mt-4 p-4 border-gray-800 border-2 h-fit">
            <p className="text-sm font-light text-gray-500">Exams - This month Results</p>
            <div className="py-2 px-2 mt-4 flex w-full justify-between">
                <div className="flex flex-col">
                    <p className="flex text-md font-medium ">Computer Vision</p>
                    <p className="flex text-sm text-gray-500">Written Exam</p>
                </div>
                <p className="text-lg text-green-400">4.5</p>
            </div>
            <div className="py-2 px-2 mt-4 flex w-full justify-between">
                <div className="flex flex-col gap-1">
                    <p className="flex text-md font-medium ">Human Bot Interaction</p>
                    <p className="flex text-sm text-gray-500">Written Exam</p>
                </div>
                <p className="text-lg text-green-400">4.5</p>
            </div>
            <div className="py-2 px-2 mt-4 flex w-full justify-between">
                <div className="flex flex-col gap-1">
                    <p className="flex text-md font-medium ">Artificial Inteliigence for Robotics</p>
                    <p className="flex text-sm text-gray-500">Written Exam</p>
                </div>
                <p className="text-lg text-red-400">2.0</p>
            </div>
            <div className="py-2 px-2 mt-4 flex w-full justify-between">
                <div className="flex flex-col gap-1">
                    <p className="flex text-md font-medium ">Computer Vision</p>
                    <p className="flex text-sm text-gray-500">Written Exam</p>
                </div>
                <p className="text-lg text-amber-400">2.5</p>
            </div>
            <div className="py-2 px-2 mt-4 flex w-full justify-between">
                <div className="flex flex-col gap-1">
                    <p className="flex text-md font-medium ">Computer Vision</p>
                    <p className="flex text-sm text-gray-500">Written Exam</p>
                </div>
                <p className="text-lg text-amber-400">2.5</p>
            </div>
            <div className="py-2 px-2 mt-4 flex w-full justify-between">
                <div className="flex flex-col gap-1">
                    <p className="flex text-md font-medium ">Computer Vision</p>
                    <p className="flex text-sm text-gray-500">Written Exam</p>
                </div>
                <p className="text-lg text-amber-400">2.5</p>
            </div>
        </div>
    );
}