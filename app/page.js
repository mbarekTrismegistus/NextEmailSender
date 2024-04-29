import { Button } from "@nextui-org/react";
import Link from "next/link";
import { auth, signIn } from "@/auth/auth";

export default async function page() {

    const session = await auth()

  return (
    <>
        <div className="text-center md:text-start flex-col-reverse md:flex-row flex mt-[30%] md:mt-[8vw] md:ps-[120px] px-[80px] items-center">
            <div className="flex-1">
                    <h1 className="text-3xl md:text-7xl font-bold mb-[15px] hero-text">Send Emails Easily to anyone, as u wish</h1>
                    <p className="">Send Emails in Html, or choose a template that fit your needs</p>
                    <div className="mt-[30px]">
                        {session ?
                        <div>
                            <Link href={`choose`}>
                                <Button color="primary" href="#" variant="shadow" className="me-2 text-white mt-5">
                                    Choose A Template
                                </Button>
                            </Link>
                            <Link href={`rawhtml`}>
                                <Button color="primary" href="#" variant="bordered" className="mx-2">
                                    Raw HTML
                                </Button>
                            </Link>
                        </div>
                        :
                        <Link href={'/registre'}>
                            <Button color="primary" variant="shadow">
                                Create an Account
                            </Button>
                        </Link>
                        }
                    </div>
            </div>
            <div className="flex-1 min-h-[300px] min-w-[400px] flex md:h-[400px] md:min-w-[500px] items-center justify-content-center">
                <spline-viewer className="flex items-center" id="spline" loading-anim-type="spinner-small-dark" url="https://prod.spline.design/W1IuSjc6919Nzu6j/scene.splinecode" style={{width:"100%", height:"100%"}} ></spline-viewer>        
            </div>
        </div>
    </>
  )
}
