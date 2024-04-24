"use client"

import { Button } from "@nextui-org/react";
import Email from "../../email";
import { Tabs } from "../../components/tabs";
import { useState } from "react";
import Link from "next/link";


export default function Choose() {
    const [template, setTemplate] = useState("")
    const tabs = [
        {
          title: "mainmail",
          value: "product",
          content: (
            <div className="w-full overflow-hidden relative h-full mx-auto overflow-scroll rounded-2xl p-10 text-white bg-gradient-to-br from-purple-700 to-violet-900 scrollbar">
              <p className="text-2xl font-bold">Product Tab</p>
              <Email/>
            </div>
          ),
        },
        {
          title: "Services",
          value: "services",
          content: (
            <div className="w-full overflow-hidden relative h-full mx-auto overflow-scroll rounded-2xl p-10 text-white bg-gradient-to-br from-purple-700 to-violet-900 scrollbar">
              <p>Services tab</p>
              <Email/>
            </div>
          ),
        },
        {
          title: "Playground",
          value: "playground",
          content: (
            <div className="w-full overflow-hidden relative h-full overflow-scroll rounded-2xl p-10 text-white bg-gradient-to-br from-purple-700 to-violet-900 scrollbar">
              <p>Playground tab</p>
              <Email/>
            </div>
          ),
        },
    ]
  return (
    <div>
        <div className="h-[10rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full items-start justify-start my-40 ">
            <p className="md:text-6xl mx-auto font-bold text-center mb-[60px] hero-text">Choose A Template</p>
            <Tabs tabs={tabs} choose={setTemplate} activeTabClassName={"text-black"}/>
            
        </div>
        <Link href={`emails/${template || "mainmail"}`}>
            <Button className="mx-auto" color="primary" variant="shadow">
                Choose
            </Button>
        </Link>
    </div>
  )
}
