"use client"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/hook";
import { interfaces } from "mocha";



interface prop{
    userPrompt:any,
    index:number,
    chatBoxRef:any
}

export default function PromptResponseView({userPrompt,index,chatBoxRef}:prop){

    const load = useRef(false);
    const dispatch = useAppDispatch();
    const [starSvg,setStarSvg] = useState({
        fill:'none',
        stroke:'rgb(156 163 175/1)'
    })
    const [starred,setStarred] = useState(false);
    const [copy,setCopy] = useState(false);



    const toggleStarSvg =()=>{
        if(!starred){
            setStarSvg({
                fill:'rgb(0 0 0 0)',
                stroke:'rgb(0 0 0 0)'
            })
            setStarred(true);
        }
        else{
            setStarSvg({
                fill:'none',
                stroke:'rgb(156 163 175/1)'
            })
            setStarred(false);
        }
    }


  
    const handleCopy=()=>{
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(userPrompt)
              .then(() => {
                setCopy(true);
                setTimeout(() => {setCopy(false)}, 1500);
              })
              .catch((err) => {
                console.error('Clipboard API failed: ', err);
              });
          }
    }


    return (
        <div className="flex h-fit pt-[2vh] w-full items-start flex-col  ">
            <div className="w-full flex flex-col">
                <div className="flex justify-start h-fit flex-row gap-[2vh] w-full py-[1vh]">
                    <div className="flex rounded-full h-[3vh] w-[3vh] bg-zinc-600"></div>
                </div>
                <div className="flex w-full justify-start">
                <div className="flex items-start justify-start flex-col gap-0 relative break-all p-2 sm:p-4 sm:max-w-[calc(98%)] text-base sm:text-normal w-full rounded-xl 
                 break-words shadow-sm max-w-[95vw] text-white bg-[#1d1e20]">
                    {userPrompt}
                </div>
                </div>
                <div className="flex flex-row items-center gap-[0.4vh] justify-start py-1 px-1 text-gray-400">
                    <div className="hover:cursor-pointer py-2 px-2 rounded-full flex hover:bg-gray-100 hover:bg-opacity-10':'hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 50 50" strokeWidth="2" stroke="rgb(156 163 175/1)">
                        <path d="M 25 5 C 13.964844 5 5 13.964844 5 25 C 4.996094 25.359375 5.183594 25.695313 5.496094 25.878906 C 5.808594 26.058594 6.191406 26.058594 6.503906 25.878906 C 6.816406 25.695313 7.003906 25.359375 7 25 C 7 15.046875 15.046875 7 25 7 C 31.246094 7 36.726563 10.179688 39.957031 15 L 33 15 C 32.640625 14.996094 32.304688 15.183594 32.121094 15.496094 C 31.941406 15.808594 31.941406 16.191406 32.121094 16.503906 C 32.304688 16.816406 32.640625 17.003906 33 17 L 43 17 L 43 7 C 43.003906 6.730469 42.898438 6.46875 42.707031 6.277344 C 42.515625 6.085938 42.253906 5.980469 41.984375 5.984375 C 41.433594 5.996094 40.992188 6.449219 41 7 L 41 13.011719 C 37.347656 8.148438 31.539063 5 25 5 Z M 43.984375 23.984375 C 43.433594 23.996094 42.992188 24.449219 43 25 C 43 34.953125 34.953125 43 25 43 C 18.753906 43 13.269531 39.820313 10.042969 35 L 17 35 C 17.359375 35.007813 17.695313 34.816406 17.878906 34.507813 C 18.058594 34.195313 18.058594 33.808594 17.878906 33.496094 C 17.695313 33.1875 17.359375 32.996094 17 33 L 8.445313 33 C 8.316406 32.976563 8.1875 32.976563 8.058594 33 L 7 33 L 7 43 C 6.996094 43.359375 7.183594 43.695313 7.496094 43.878906 C 7.808594 44.058594 8.191406 44.058594 8.503906 43.878906 C 8.816406 43.695313 9.003906 43.359375 9 43 L 9 36.984375 C 12.648438 41.847656 18.460938 45 25 45 C 36.035156 45 45 36.035156 45 25 C 45.003906 24.730469 44.898438 24.46875 44.707031 24.277344 C 44.515625 24.085938 44.253906 23.980469 43.984375 23.984375 Z"></path>
                        </svg>
                    </div>
                    <div className="hover:cursor-pointer py-2 px-2 rounded-full flex  hover:bg-gray-100 hover:bg-opacity-10':'hover:bg-gray-100" onClick={handleCopy}>
                        { copy? (
                            <svg width="18px" height="18px" viewBox="0 0 24 24" fill="rgb(156 163 175/1)" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.0998 2H12.8998C9.81668 2 8.37074 3.09409 8.06951 5.73901C8.00649 6.29235 8.46476 6.75 9.02167 6.75H11.0998C15.2998 6.75 17.2498 8.7 17.2498 12.9V14.9781C17.2498 15.535 17.7074 15.9933 18.2608 15.9303C20.9057 15.629 21.9998 14.1831 21.9998 11.1V6.9C21.9998 3.4 20.5998 2 17.0998 2Z" fill="rgb(156 163 175/1)"/>
                            <path d="M11.1 8H6.9C3.4 8 2 9.4 2 12.9V17.1C2 20.6 3.4 22 6.9 22H11.1C14.6 22 16 20.6 16 17.1V12.9C16 9.4 14.6 8 11.1 8ZM12.29 13.65L8.58 17.36C8.44 17.5 8.26 17.57 8.07 17.57C7.88 17.57 7.7 17.5 7.56 17.36L5.7 15.5C5.42 15.22 5.42 14.77 5.7 14.49C5.98 14.21 6.43 14.21 6.71 14.49L8.06 15.84L11.27 12.63C11.55 12.35 12 12.35 12.28 12.63C12.56 12.91 12.57 13.37 12.29 13.65Z" fill="rgb(156 163 175/1)"/>
                            </svg>
                        ):(
                            <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none"  xmlns="http://www.w3.org/2000/svg" >
                            <g clip-path="url(#clip0_429_11155)">
                            <path d="M16 3H4V16"  stroke-width="2" stroke="rgb(156 163 175/1)" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8 7H20V19C20 20.1046 19.1046 21 18 21H10C8.89543 21 8 20.1046 8 19V7Z" stroke="rgb(156 163 175/1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_429_11155">
                            <rect width="24" height="24" fill="white"/>
                            </clipPath>
                            </defs>
                            </svg>
                        )}
                    </div>
                    <div className="hover:cursor-pointer py-2 px-2 rounded-full flex hover:bg-gray-100 hover:bg-opacity-10':'hover:bg-gray-100" onClick={toggleStarSvg}>
                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill={starSvg.fill} xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z"  stroke={starSvg.stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
                
            </div>
        </div>
    )
}