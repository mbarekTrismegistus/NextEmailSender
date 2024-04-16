"use client"

import React, { useState } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenuItem, NavbarMenu, NavbarMenuToggle} from "@nextui-org/react";
import { useSession, signIn } from "next-auth/react";


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let session = useSession()
  console.log(session)

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
          
          {session.data == undefined ? session.status == "loading" ? " loading..." : "no session" : session.data.user.name}

        </NavbarItem>
        <NavbarItem>
          <Button color="primary" href="#" variant="bordered">
            Raw HTML
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="dark">
            <NavbarMenuItem>
              <Button color="primary" href="#" variant="shadow">
                {session.name}
              </Button>
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
