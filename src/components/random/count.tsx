"use client"

import { animate, motion, MotionStyle, useMotionValue, useTransform } from "motion/react"
import { useEffect } from "react"

type arg={
    cnt:number,
    text:MotionStyle|undefined
}
export const CountNumber:React.FC<arg>=({cnt,text})=>{
    const count = useMotionValue(0)
    const rounded = useTransform(() => Math.round(count.get()))

    useEffect(() => {
        const controls = animate(count, cnt, { duration: 5 })
        return () => controls.stop()
    }, [])

    return <motion.pre style={text}>{rounded}</motion.pre>
}

/**
 * ==============   Styles   ================
 */


