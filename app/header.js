"use client"

import React, { useState } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenuItem, NavbarMenu, NavbarMenuToggle, Skeleton, DropdownSection, Image} from "@nextui-org/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import { useSession, signIn, signOut } from "next-auth/react";
import {Avatar} from "@nextui-org/react";
import ThemeSwitcher from "./components/themeSwitcher";
import Link from "next/link";
import { BoxArrowLeft, ClockFill, CodeSlash, Envelope } from "react-bootstrap-icons";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  let session = useSession()

  return (
    <Navbar className="justify-start px-[50px] bg-transparent" maxWidth={'full'}>
      <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      <NavbarBrand className="max-w-[100%]">

        <Link href={"/"} className="font-bold gap-2 flex text-inherit items-center">
          <Image src="/logo.png" width={50} />
          <p>Email Sender</p>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex  max-w-[100%]" justify="end">
        <NavbarItem>
          
        {session.data == undefined ? session.status == "loading" ? <Skeleton className="rounded-full w-[40px] h-[40px] before:!duration-1000"/> : 
        <div>
          <Button color="primary" variant="bordered" className="mx-2"><Link href="/api/auth/signin">Login</Link></Button> 
        </div>
        : 
        <Dropdown placement="bottom-center" className="border border-1 border-zinc-300 dark:border-zinc-800 text-black bg-gradient-to-r from-slate-50 to-slate-200 dark:from-zinc-950 dark:to-zinc-900 dark:text-white">
          
          <DropdownTrigger>
            <Avatar isBordered color="primary" src={`${session.data.user.image}`}/>
          </DropdownTrigger>
          <DropdownMenu>
              {session && session.data?.user.role == "admin" ? 
                <DropdownSection title={'Dashboard'} showDivider>
                  <DropdownItem>
                    <Link href={"/dashboard"}>
                      <p className="pe-[5vw] w-[100%]">
                        Dashboard
                      </p>
                    </Link>
                  </DropdownItem>
                </DropdownSection>
              :
              null
              }
            <DropdownSection title="Profile Actions">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{session.data.user.name}</p>
              </DropdownItem>
              <DropdownItem className="py-3" endContent={
                  <Link href={'/emails/choose'}>
                    <Envelope size={20}/>
                  </Link>
                  }>
                <Link href={'/emails/choose'} >
                  <p className="pe-[5vw] w-[100%]">
                    Choose a Template
                  </p>
                </Link>
              </DropdownItem>
              <DropdownItem className="py-3" endContent={
                  <Link href={'/rawhtml'}>
                    <CodeSlash size={20}/>
                  </Link>
                  }>
                <Link href={'/rawhtml'}>
                  <p className="pe-[5vw] w-[100%]">
                    Send Email With HTML
                  </p>
                </Link>   
              </DropdownItem>
              <DropdownItem className="py-3" endContent={
                  <Link href={'/schedule'}>
                    <ClockFill size={20}/>
                  </Link>
                  }>
                <Link href={'/schedule'} >
                  <p className="pe-[5vw] w-[100%]">
                    Schedule an Email
                  </p>
                </Link>  
                    
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={signOut} className="py-3" endContent={<BoxArrowLeft size={20}/>}>
                Log Out
              </DropdownItem>
            </DropdownSection>
              
          </DropdownMenu>
        </Dropdown>
      
        }
        

        </NavbarItem>
        <NavbarItem>
          <ThemeSwitcher/>
        </NavbarItem>
        

      </NavbarContent>
      <NavbarMenu>
            <NavbarMenuItem>
                {session.data == undefined ? session.status == "loading" ? <Skeleton className="rounded-full w-[40] h-[40] before:!duration-1000"/> : "no session" : <Avatar isBordered color="primary" src={`${session.data.user.image}`}/>}
            </NavbarMenuItem>


      </NavbarMenu>
    </Navbar>
  );
}
