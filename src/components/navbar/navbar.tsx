"use client"
import { setAddress } from "@/redux/slice/wallet";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Avatar} from "@heroui/react";
import { BrowserProvider, ethers } from 'ethers';
import { useEffect, useRef, useState } from "react";
import { useAppDispatch , useAppSelector } from "@/redux/hook";
import { connectWallet } from "@/redux/api/wallet";


declare global {
    interface Window {
        ethereum: any; 
    }
}

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function NavBar() {
    const load = useRef<boolean>(false);
    const [connected,setConnecTed] = useState<boolean>(false);
    const [menu,setMenu] = useState(false);
    const [providers,setProviders] = useState<ethers.BrowserProvider|null>(null);
    const dispatch = useAppDispatch();
    const address = useAppSelector((state) => state.wallet.address);
    const avatar:string  = useAppSelector((state)=>state.wallet.avatar) || "";
    async function connectWalletHandler(): Promise<ethers.BrowserProvider | undefined> {
        if (window.ethereum) {
            try {
                await dispatch(connectWallet());
            } catch (error) {
                console.error("User denied account access:", error);
                return undefined;
            }
        } else {
            console.error("MetaMask not detected!");
            return undefined;

        }
    }
    useEffect(()=>{
        async function check(){
            await dispatch(connectWallet());

      }
        if(!load.current){
          check()
          load.current=true;
        }
    },[])
    return (
    <Navbar className="h-[12vh] w-full sticky">
      <NavbarBrand className="w-full">
        <AcmeLogo />
        <p className="font-bold text-inherit">METALEARN</p>
      </NavbarBrand>
      <NavbarContent className="hidden w-full sm:flex gap-4 justify-center relative" justify="center">
        <NavbarItem className="flex flex-col relative" onMouseEnter={()=>setMenu(true)} onClick={()=>setMenu(false)}>
          <Link color="foreground" href="#">
            Features
          </Link>
          {menu ?(
        <div className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-[300px] overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5" onMouseLeave={()=>setMenu(false)} onClick={()=>setMenu(false)}>
          <div className="p-1">
            <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm/6 hover:bg-gray-50">
              <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <svg className="size-6 text-gray-600 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
            </svg>
              </div>
              <div className="flex-auto">
            <a href="#" className="block font-semibold text-gray-900">
              Analytics
              <span className="absolute inset-0"></span>
            </a>
            <p className="mt-1 text-gray-600">Get a better understanding of your traffic</p>
              </div>
            </div>
            <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm/6 hover:bg-gray-50">
              <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <svg className="size-6 text-gray-600 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
            </svg>
              </div>
              <div className="flex-auto">
            <a href="#" className="block font-semibold text-gray-900">
              Engagement
              <span className="absolute inset-0"></span>
            </a>
            <p className="mt-1 text-gray-600">Speak directly to your customers</p>
              </div>
            </div>
            <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm/6 hover:bg-gray-50">
              <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <svg className="size-6 text-gray-600 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33" />
            </svg>
              </div>
              <div className="flex-auto">
            <a href="#" className="block font-semibold text-gray-900">
              Security
              <span className="absolute inset-0"></span>
            </a>
            <p className="mt-1 text-gray-600">Your customers’ data will be safe and secure</p>
              </div>
            </div>
            <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm/6 hover:bg-gray-50">
              <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <svg className="size-6 text-gray-600 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
              </div>
              <div className="flex-auto">
            <a href="#" className="block font-semibold text-gray-900">
              Integrations
              <span className="absolute inset-0"></span>
            </a>
            <p className="mt-1 text-gray-600">Connect with third-party tools</p>
              </div>
            </div>
            <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm/6 hover:bg-gray-50">
              <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <svg className="size-6 text-gray-600 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
              </div>
              <div className="flex-auto">
            <a href="#" className="block font-semibold text-gray-900">
              Automations
              <span className="absolute inset-0"></span>
            </a>
            <p className="mt-1 text-gray-600">Build strategic funnels that will convert</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
            <a href="#" className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100">
              <svg className="size-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
            <path fillRule="evenodd" d="M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm6.39-2.908a.75.75 0 0 1 .766.027l3.5 2.25a.75.75 0 0 1 0 1.262l-3.5 2.25A.75.75 0 0 1 8 12.25v-4.5a.75.75 0 0 1 .39-.658Z" clipRule="evenodd" />
              </svg>
              Watch demo
            </a>
            <a href="#" className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100">
              <svg className="size-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z" clipRule="evenodd" />
              </svg>
              Contact sales
            </a>
          </div>
        </div>
          ):(<></>)}
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" href="#">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className="w-full gap-4 justify-end">
        <NavbarItem>
          {address ? (
            <>
             {/*<Button className="py-[8px] px-4 rounded-4xl text-normal hover:opacity-75 hover:cursor-pointer bg-green-700 " href="#" variant="solid">
               Connected
             </Button>*/}
             <div className="flex gap-2 items-center">
                <Avatar isBordered src={avatar} className="h-6 w-6" />
                <div className="flex items-center max-w-[120px] w-full justify-center px-2 py-2">
                    <p className="truncate text-sm bg-transparent bg-gradient-to-br from-violet-500 to-pink-400 bg-clip-text ">{address}</p>
                </div>
              </div>
            </>

          ):(
            <Button className="py-[19px] px-4 rounded-4xl text-normal hover:opacity-75 hover:cursor-pointer bg-zinc-600 " href="#" variant="solid" onPress={connectWalletHandler}>
              Connect
            </Button>
          )}
        </NavbarItem>
        <NavbarItem>     

        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}



