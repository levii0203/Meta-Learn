"use client"
import React ,{useRef} from "react";
import { useAppSelector } from "@/redux/hook";
import PromptInput from "./input";
import PromptResponseView from './promptResponse'
import PromptView from './prompt'
import Wait from './wait_for_response'



export default function ChatbotLayout(){
    const promptResponse:any|never = useAppSelector((state) => state.chat.promptResponse);
    const message:string|null = useAppSelector((state)=>state.chat.userPrompt)
    const sent = useAppSelector((state)=>state.chat.sent)
    const chatBoxRef:any = useRef(null);
    return (
        <div className="flex flex-col h-full w-full items-center">
                    <div
                        id="chat"
                        ref={chatBoxRef}
                        className="custom-vertical-scrollbar w-full overflow x-hidden flex-1 m-0 z-20 h-auto min-h-0 max-h-[calc(100%)] flex flex-col overflow-y-auto pt-[14vh] md:pt-[6vh] pb-[16vh] lg:pb-[20vh] 
                        px-[calc(3%)] md:px-[calc(15%)] xl:px-[25vw]"
                    >
                        
                       
                        {promptResponse.map((prompt:any, index:number) => (
                            <>
                            <PromptView key={index} userPrompt={prompt.message} /> 
                            {prompt.res?(
                                <>
                                <PromptResponseView key={index} userPrompt={prompt.res} index={index} chatBoxRef={chatBoxRef}/> 
                                </>
                            ):(
                                <>
                                <PromptResponseView key={index} userPrompt="Sorry, there has been a trouble" index={index} chatBoxRef={chatBoxRef}/> 
                                </>
                            )}
                            </>
                        ))}
                        {sent?(
                            <>
                                <PromptView userPrompt={message} />  
                                <Wait message="Waiting for a response"/>
                            </>
                        ):(
                            <></>
                        )}
                       
                    </div>
            <div className="flex flex-col bottom-0 pb-4 items-center justify-center absolute h-fit w-full">
                <PromptInput/>
            </div>
        </div>
    )
}
