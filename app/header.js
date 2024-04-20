"use client"

import React, { useState } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenuItem, NavbarMenu, NavbarMenuToggle} from "@nextui-org/react";
import { useSession, signIn } from "next-auth/react";
import {Avatar} from "@nextui-org/react";


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let session = useSession()


  return (
    <Navbar className="dark justify-start px-[50px]" maxWidth={'full'}>
      <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      <NavbarBrand className="max-w-[100%]">
        <p className="font-bold text-inherit">Email Sender</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex  max-w-[100%]" justify="end">
        <NavbarItem>
          
        {session.data == undefined ? session.status == "loading" ? " loading..." : "no session" : <Avatar isBordered color="primary" src={`${session.data.user.image}`}/>}

        </NavbarItem>
        <NavbarItem>
          <Button color="primary" href="#" variant="bordered">
            Raw HTML
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="dark">
            <NavbarMenuItem>
                {session.data == undefined ? session.status == "loading" ? " loading..." : "no session" : <Avatar isBordered color="primary" src={`${session.data.user.image}`}/>}
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Button color="primary" href="#" variant="bordered">
                Raw HTML
              </Button>
            </NavbarMenuItem>

      </NavbarMenu>
    </Navbar>
  );
}
