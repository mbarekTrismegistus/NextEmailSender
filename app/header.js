"use client"

import React, { useState } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenuItem, NavbarMenu, NavbarMenuToggle, Skeleton} from "@nextui-org/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import { useSession, signIn, signOut } from "next-auth/react";
import {Avatar} from "@nextui-org/react";
import ThemeSwitcher from "./components/themeSwitcher";
import Link from "next/link";
import { BoxArrowLeft, CodeSlash, Envelope } from "react-bootstrap-icons";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  let session = useSession()

  return (
    <Navbar className="justify-start px-[50px]" maxWidth={'full'}>
      <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      <NavbarBrand className="max-w-[100%]">
        <p className="font-bold text-inherit">Email Sender</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex  max-w-[100%]" justify="end">
        <NavbarItem>
          
        {session.data == undefined ? session.status == "loading" ? <Skeleton className="rounded-full w-[40px] h-[40px]"/> : 
        <div>
          <Button color="primary" variant="bordered" className="mx-2"><Link href="/api/auth/signin">Login</Link></Button> 
        </div>
        : 
        <Dropdown placement="bottom-center">
          <DropdownTrigger>
            <Avatar isBordered color="primary" src={`${session.data.user.image}`}/>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{session.data.user.email}</p>
            </DropdownItem>
            <DropdownItem className="py-3" endContent={<Envelope size={20}/>}>
              <Link href={'/emails/choose'}>
                Choose a Template
              </Link>
            </DropdownItem>
            <DropdownItem className="py-3" endContent={<CodeSlash size={20}/>}>
              <Link href={'/rawhtml'}>
                Send Email With HTML
              </Link>
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={signOut} className="py-3" endContent={<BoxArrowLeft size={20}/>}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      
        }

        </NavbarItem>
        {session && session.data?.user.role == "admin" ? 
          <NavbarItem>
            <Button><Link href={"/dashboard"}>Dashboard</Link></Button>
          </NavbarItem>
        :
        ""
        }
        
        <NavbarItem>
          <ThemeSwitcher/>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="dark">
            <NavbarMenuItem>
                {session.data == undefined ? session.status == "loading" ? <Skeleton className="rounded-full w-[40] h-[40]"/> : "no session" : <Avatar isBordered color="primary" src={`${session.data.user.image}`}/>}
            </NavbarMenuItem>


      </NavbarMenu>
    </Navbar>
  );
}
