"use client";
import { useState, useEffect, useRef} from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import SaveUser from "@/redux/api/user";

interface FormData {
  email?: string;
  password?: string;
}


export default function LoginForm() {
  const loadPg = useRef(false);
  const router = useRouter();
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const dispatch = useAppDispatch();
  const role = useAppSelector((state)=>state.user.role)
  

  async function DbPost(data: FormData) {
    try{
        await dispatch(SaveUser(data));
         if(role==='student'){
            router.push('/dashboard/student')
         }
         else if(role==='educator'){
            router.push('/dashboard/educator')
         }
    } 
    catch(err){
      console.log(err)
    }
    
  }

  const OnSubmitHandler=async()=>{
      const data:FormData = {
          password: password,
          email: email,
      }
      await DbPost(data);
  }
  useEffect(()=>{
    async function handler(){
       if(!loadPg.current){
           const r = await fetch('/api/login',{method:'GET'});
           const res:{message:string} = await r.json()
           loadPg.current = true;
       }
    }
    handler()
 },[])
  return (
    <form className="max-w-sm mx-auto w-full">
      <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="JohnDoe@gmail.com"
            required
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your password
        </label>
        <input
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input
            id="remember"
            type="checkbox"
            className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
          />
        </div>
        <label
          htmlFor="remember"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Remember me
        </label>
      </div>
      <button
        type="reset"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={OnSubmitHandler}
      >
        Submit
      </button>
    </form>
  );
}