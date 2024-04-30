import { Button } from "@nextui-org/react";
import Link from "next/link";
import { auth, signIn } from "@/auth/auth";

export default async function page() {

    const session = await auth()

  return (
    <>
        <div className="text-center md:text-start flex-col-reverse md:flex-row flex mt-[30%] md:mt-[8vw] md:ps-[120px] px-[80px] items-center">
            <div className="flex-1">
                    <h1 className="text-3xl md:text-5xl font-bold mb-[15px] hero">Streamline client communication effortlessly with BrosMedia's email services.</h1>
                    <div className="mt-[30px]">
                        {session ?
                        <div>
                            <Link href={`choose`}>
                                <Button href="#" variant="shadow" className="me-2 text-black mt-5 bg-white rounded-full">
                                    Choose A Template
                                </Button>
                            </Link>
                            <Link href={`rawhtml`}>
                                <Button color="primary" href="#" className="mx-2 bg-white text-black rounded-full">
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
            <div className="flex-1 min-h-[300px] min-w-[450px] flex md:h-[400px] md:min-w-[500px] items-center justify-content-center">
                <spline-viewer className="flex items-center" id="spline" loading-anim-type="spinner-small-dark" url="https://prod.spline.design/W1IuSjc6919Nzu6j/scene.splinecode" style={{width:"150%", height:"150%"}} ></spline-viewer>        
            </div>
        </div>
    </>
  )
}
