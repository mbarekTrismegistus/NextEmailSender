import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function page() {
  return (
    <div className="text-center md:text-start flex-col-reverse md:flex-row flex mt-[30%] md:mt-[8vw] md:ps-[120px] px-[80px] items-center">
        <div className="flex-1">
                <h1 className="text-3xl md:text-7xl font-bold mb-[35px] hero-text">Send Emails Easily to anyone, as u wish</h1>
                <p className="">Send Emails in Html, or choose a template that fit your needs</p>
                <div className="mt-5">
                    <Link href={`choose`}>
                        <Button color="primary" href="#" variant="shadow" className="me-2 mt-5">
                            Choose A Template
                        </Button>
                    </Link>
                    <Link href={`rawhtml`}>
                        <Button color="primary" href="#" variant="bordered" className="mx-2">
                            Raw HTML
                        </Button>
                    </Link>
                </div>
        </div>
        <div className="flex-1 flex justify-content-center items-center">
            <spline-viewer url="https://prod.spline.design/W1IuSjc6919Nzu6j/scene.splinecode" style={{minHeight:"160%",minWidth:"100%"}}></spline-viewer>        
        </div>
    </div>
  )
}
