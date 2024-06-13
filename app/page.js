

import { TextGenerateEffect } from "./components/text-generate-effect";
import Buttons from "./components/buttons";




export default async function page() {

   
    const words = `Streamline client communication effortlessly with BrosMedia's email services.`
        

  return (

        <div className="flex flex-col justify-center w-[70%] mx-auto items-center text-center h-100">
                    <TextGenerateEffect words={words}/>
                    <div className="mt-[30px]">
                       
                        <Buttons/>
                       
                    </div>
        </div>

  )
}
