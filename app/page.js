import { Button } from "@nextui-org/react";
import Link from "next/link";
import { auth, signIn } from "@/auth/auth";
import { TextGenerateEffect } from "./components/text-generate-effect";

export default async function page() {

    const session = await auth()
    const words = `Streamline client communication effortlessly with BrosMedia's email services.`

  return (
    <>
        <div className="flex pt-[15vh] w-[70%] mx-auto items-center text-center herosection">
            <div>
                    <TextGenerateEffect words={words}/>
                    <div className="mt-[30px]">
                        {session ?
                        <div>
                            <Link href={`choose`}>
                                <Button href="#" color="primary" variant="shadow" className="me-2 mt-5 rounded-full">
                                    Choose A Template
                                </Button>
                            </Link>
                            <Link href={`rawhtml`}>
                                <Button color="primary" variant="bordered" className="mx-2 dark:text-white text-black rounded-full">
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
        </div>
    </>
  )
}
