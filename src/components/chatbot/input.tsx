"use client"
import { useState , useRef } from "react";
import { IoMdArrowRoundUp } from "react-icons/io";
import { PiMicrophoneLight } from "react-icons/pi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addPrompt, setSent, setUserPrompt } from "@/redux/slice/chat";


export default function PromptInput(){
    const dispatch = useAppDispatch();
    const [typing,setTyping] = useState(false);
    const [files,setFiles] = useState<Array<never>|File[]>([]);
    const fileInputRef = useRef<any|null>(null);
    const prompt = useAppSelector((state)=>state.chat.userPrompt)

    const isTyping=(value:string|null)=>{
        if(value==="" || value===null){
            setTyping(false);
        }
        else{
            dispatch(setUserPrompt(value))
            setTyping(true);
        }
    }

    const handleFileButtonClick = () => {
        fileInputRef.current.click();
      };


  const handleFileChange = (e) => {
    const file = e.target.files[0]; 
    if (file) {
        setFiles((prevfiles) => [...prevfiles, file]);
        console.log(file.name);
        e.target.value = ''; 
    }
  };

  const handleFileDelete=async(key:number)=>{
    let newfiles:Array<any> = [];
    for( let i=0;i<files.length;i++){
        if(i!==key){
            newfiles.push(files[i]);
        }
    }
    await setFiles(newfiles);
  }
   const api_key="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"
  const chatbot=async()=>{
    try {
        dispatch(setSent(true));
        const response:any = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${api_key}`,
          "HTTP-Referer": `https://www.webstylepress.com`,
          "X-Title": `WebStylePress`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: `meta-llama/llama-4-maverick`,
          messages: [
            {
              role: "system",
              content:
              "You are an AI-powered educational assistant for a blockchain education platform. Your role is to help students understand blockchain concepts and assist with their queries and assignments. Provide clear, accurate, and beginner-friendly explanations for topics like decentralization, consensus mechanisms, smart contracts, cryptography, tokenomics, and more. Tailor responses to the user's level of expertise, inferred from their question, using simple language, analogies, or step-by-step breakdowns to make complex ideas accessible When assisting with assignments: 1. Offer explanations, examples, or hints to guide students toward solutions without directly solving the assignment. 2. Suggest relevant concepts or resources (e.g., pseudocode for coding tasks, diagrams for architecture questions) to deepen understanding. 3. Ask clarifying questions if the assignment or query is vague to ensure relevance. Stay concise unless a detailed response is requested. If a question is unclear, ask for clarification to provide the most relevant answer. Do not provide financial advice, speculative content about cryptocurrencies, or off-topic information. Avoid using overly technical jargon unless the user demonstrates advanced knowledge."
            },
            { role: "user", content: prompt },
          ],
        }),
      })
      .catch(err=>console.log(err))
      .finally(()=>dispatch(setSent(false)))
      const data=await response.json();
      console.log(data)
      const markdownText =
      data.choices?.[0]?.message?.content || "No response received.";
      dispatch(addPrompt({message:prompt,res:markdownText}));
    }catch(err){
        console.log(err);
    }
  }


    return(
        <div className={`min-h-[calc(4%)] m-0 p-0 h-fit z-20 xl:w-[calc(50%)] md:w-[calc(90%)] w-[calc(90%)] rounded-[28px] bg-[#36383a] text-white flex flex-col  shadow-md`}>
            { files.length>0 ? (
                    <div className="flex h-full w-full px-4 py-4 m-0 overflow-y-hidden overflow-x-auto items-center justify-start flex-row bg-transparent">
                        { files.map((file,index)=>(
                                <div key={index} className="flex flex-row p-4  bg-[#36383a] h-[64px] shadow-md rounded-[1.25rem] w-[calc(70%)] md:w-[calc(30%)] py-2 px-3 items-center justify-between ">
                                    <div className="flex w-[calc(70%)] h-full flex-col  gap-2px items-start justify-center">
                                        <label className="flex text-normal h-full w-[calc(90%)]  text-gray-100 truncate ">{file.name}</label>
                                        <p className="flex text-sm h-full w-[calc(90%)] text-gray-300 truncate">{file.type}</p>
                                    </div>
                                    <div className="flex h-full w-full items-center justify-end">
                                        <div className="flex p-2 h-fit w-fit hover:bg-zinc-600 rounded-full bg-transparent hover:cursor-pointer" onClick={()=>handleFileDelete(index)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" width="22px" height="22px" viewBox="0 0 32 32">
                                                <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5  c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4  C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                        ))} 
                    </div> 
                ):(
                   <></> 
                )
            }
            <input id="userInput" className="flex px-4 py-4 md:pt-[2%] md:pb-[1%] h-full m-0 w-full outline-none  break-all text-lg bg-transparent placeholder:font-thin placeholder:text-gray-400"  type="text" placeholder="Type your message to joy.ai"
            onChange={(e)=>{isTyping(e.target.value);}}/>
            <div className="flex h-full px-4 py-2 w-full">
                <div className="flex w-full gap-[calc(2%)] justify-start items-center ">
                    <div className="text-white hover:text-black flex rounded-full py-[4px] hover:border-white px-[4px] border-zinc-600 border-2 border-spacing-1 md:py-2 md:px-2 text-2xl md:text-2xl lg:text-3xl w-fit hover:bg-white cursor-pointer transition-transform hover:scale-105" onClick={handleFileButtonClick}>
                        <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }} // Hide the default input
                        />
                    </div>
                </div>
                <div className="flex w-full  justify-end">
                    { typing ? (
                        <div className={`flex rounded-full z-20 shadow-md items-center justify-center text-2xl h-fit py-[6px] px-[6px] border-1 border-spacing-1 border-black md:h-12 md:w-12 hover:bg-opacity-65 hover:bg-slate-50 bg-white text-black font-semibold cursor-pointer  transition-transform hover:scale-110`}
                        onClick={async()=>{await chatbot()}}>
                            < IoMdArrowRoundUp/>
                        </div>

                    ):(
                        <>
                        { files.length>0 ? (
                             <div className="flex rounded-full z-20 shadow-md items-center justify-center text-2xl py-[6px] px-[6px] border-1 border-spacing-1 h-fit border-black md:h-12 md:w-12 bg-opacity-65 bg-slate-50 text-black font-semibold cursor-pointer  transition-transform">
                                 < IoMdArrowRoundUp/>
                             </div>
                        ):(
                            <div className="flex rounded-full z-20 shadow-md items-center justify-center text-2xl h-fit py-[6px] px-[6px] md:h-12 md:w-12 bg-white text-black font-bold cursor-pointer transition-transform hover:scale-110 hover:bg-slate-50 ">
                                <PiMicrophoneLight/>
                            </div>
                        )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
