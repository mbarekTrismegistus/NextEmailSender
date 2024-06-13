"use client"

import { Button } from '@nextui-org/react';
import anime from 'animejs/lib/anime.es.js';
import Link from 'next/link';
import { useEffect } from "react";


export default function Buttons() {
    useEffect(() => {
        anime({
            targets: ".buttons",
            delay: 2000,
            opacity: 1,
            easing: "easeInOutQuad"
        })
    })
    

  return (
   
        <div className="opacity-0 buttons">
            <Link href={`/emails/choose`}>
                <Button href="#" variant="shadow" className="me-2 mt-5 bg-white dark:bg-[#ffffff] bg-[#090F4f] dark:text-[#090F4f] text-white rounded-full">
                    Choose A Template
                </Button>
            </Link>
            <Link href={`/rawhtml`}>
                <Button  variant="bordered" className="mx-2 dark:border-[#ffffff] border-[#090F4f] rounded-full">
                    Raw HTML
                </Button>
            </Link>
        </div>
    
                        
  )
}
