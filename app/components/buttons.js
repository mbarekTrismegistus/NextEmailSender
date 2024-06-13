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
                <Button href="#" color="primary" variant="shadow" className="me-2 mt-5 text-white rounded-full">
                    Choose A Template
                </Button>
            </Link>
            <Link href={`/rawhtml`}>
                <Button color="primary" variant="bordered" className="mx-2 rounded-full">
                    Raw HTML
                </Button>
            </Link>
        </div>
    
                        
  )
}
