import LoginForm from "@/components/login/login"
import KnowMore from "@/components/more/knowMore"
import { SplitText } from "@/components/random/animated"

export default function LoginPage(){
    let text = "Student Login\n"
    return (
          <div className="flex flex-row overflow-hidden h-screen w-screen bg-black items-center justify-center">
                    <KnowMore/>
                    <div className="w-full max-w-[40vw] h-full flex-col gap-[4vh] flex items-center justify-center">
                    <SplitText text="META LEARN Login" className="text-white font-semibold text-3xl"/>
                        <LoginForm/>
                    </div>
                </div>
    )
}