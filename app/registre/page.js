"use client"

import { Button, Input } from "@nextui-org/react"
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { EyeFill } from "react-bootstrap-icons";
import { EyeSlashFill } from "react-bootstrap-icons";

export default function page() {

    const [isVisible, setIsVisible] = React.useState(false);
    let [data, setData] = useState({})

    const toggleVisibility = () => setIsVisible(!isVisible);

    function handlechange(e){
        setData((prev)=>{
            return{
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const {mutate: handlesubmit, isPending} = useMutation({
        mutationFn: async () => {
            await axios.post('api/registre', { data: data })
        },
        onSuccess: () => {
            console.log("done")
        }
    })

  return (
    <div className="md:p-[50px] dark">
        <h1 className="text-3xl md:text-6xl font-bold mb-[35px] hero-text">Create An Account</h1>
        <div className="md:flex">
            <div className="flex-1 px-4">
                <div className="flex">
                    <Input label="Name" onChange={(e) => handlechange(e)} name="name" className="my-3 me-3 border-1 border-solid border-gray-700 border-x-0 rounded-full" radius="full"/>
                    <Input label="Email" onChange={(e) => handlechange(e)} name="email" className="my-3 ms-3 border-1 border-solid border-gray-700 border-x-0 rounded-full" radius="full"/>
                </div>
                
                <Input label="SMTP Password" onChange={(e) => handlechange(e)} name="smptpass" className="my-3 border-1 border-solid border-gray-700 border-x-0 rounded-full" radius="full"/>
                <Input
                    label="Password"
                    placeholder="Enter your password"
                    onChange={(e) => handlechange(e)}
                    name="password"
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                        {isVisible ? (
                            <EyeSlashFill className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                            <EyeFill className="text-2xl text-default-400 pointer-events-none" />
                        )}
                        </button>
                    }
                    type={isVisible ? "text" : "password"}
                    className="my-6 border-1 border-solid border-gray-700 border-x-0 rounded-full"
                    radius="full"
                />
                <Button disabled={isPending} variant="shadow" color="primary" onClick={handlesubmit} className="w-full my-4 rounded-full">Registre</Button>
            </div>
            <div className="flex-1 bg-black w-full">

            </div>
        </div>
        
    </div>
  )
}
