import KnowMore from "@/components/more/knowMore"
import PathDrawing from "@/components/random/path."
import SignupForm from "@/components/signup/Signup"
import { SplitText } from "@/components/random/animated"

export default function SignupPage(){
    return (
        <div className="flex flex-row overflow-hidden h-screen w-screen bg-black items-center justify-center">
            <KnowMore/>
            <div className="w-full max-w-[40vw] h-full flex-col gap-[4vh] flex items-center justify-center">
                <SplitText text="META LEARN Signup" className="text-white font-semibold text-3xl"/>
                <SignupForm/>
            </div>
        </div>
    )
}