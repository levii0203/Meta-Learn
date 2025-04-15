"use client"

import { motion, transform, useAnimate } from "motion/react"
import { useEffect, useState } from "react"

type arg = {
    className:string,
    inputClassName:string
}

const CharactersRemaining:React.FC<arg>=({className,inputClassName})=>{
    const [value, setValue] = useState("")
    const maxLength = 60
    const charactersRemaining = maxLength - value.length
    const [counterRef, animate] = useAnimate()

    // Transform functions - defined outside of render/effect functions for performance
    const mapRemainingToColor = transform([2, 6], ["#ff008c", "#ccc"])
    const mapRemainingToSpringVelocity = transform([0, 5], [50, 0])

    useEffect(() => {
        if (charactersRemaining > 6) return

        animate(
            counterRef.current,
            { scale: 1 },
            {
                type: "spring",
                velocity: mapRemainingToSpringVelocity(charactersRemaining),
                stiffness: 700,
                damping: 80,
            }
        )
    }, [animate, charactersRemaining])

    return (
        <div className={` container ${className}`}>
            <input value={value} placeholder="Search for courses" className={`${inputClassName}`} onChange={(e) => setValue(e.target.value)} />
            <div>
                <motion.span
                    ref={counterRef}
                    style={{
                        color: mapRemainingToColor(charactersRemaining),
                        willChange: "transform",
                    }}
                >
                    {charactersRemaining}
                </motion.span>
            </div>
            <Stylesheet />
        </div>
    )
}

function Stylesheet() {
    return (
        <style>
            {`
        .container, input {
          position: relative;
          font-size: 16px;
          line-height: 1;
        }

        input {
          background-color: var(--layer);
          color: #f5f5f5;
          border: 2px solid var(--border);
          border-radius: 10px;
          padding: 20px;
          width: 240px;
        }

        input:focus {
          border-color: var(--hue-blue);
        }

        .container div {
          color: #ccc;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            var(--layer) 20%
          );
          position: absolute;
          top: 50%;
          right: 2px;
          transform: translateY(-50%);
          padding: 10px;
          padding-right: 20px;
          padding-left: 50px;
        }

        .container div span {
          display: block;
        }
      `}
        </style>
    )
}

export default CharactersRemaining
