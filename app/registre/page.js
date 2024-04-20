"use client"

import { Button, Input } from "@nextui-org/react"
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useRef, useState } from "react";
import { EyeFill } from "react-bootstrap-icons";
import { EyeSlashFill } from "react-bootstrap-icons";
import { Toast } from 'primereact/toast';
import { Input as SInput } from "@/components/ui/input"


export default function page() {

    const [validated, setValidated] = useState({
        name: false,
        email:false,
        smptpass:false,
        password:false
    })
    const toast = useRef(null);

    const [isVisible, setIsVisible] = React.useState(false);
    let [data, setData] = useState({})

    const toggleVisibility = () => setIsVisible(!isVisible);

    function getBase64(file, onLoadCallback) {
        return new Promise(function(resolve, reject) {
            var reader = new FileReader();
            reader.onload = function() { resolve(reader.result); };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    function handlechange(e){
        if(e.target.type === "file"){
                    
            var promise = getBase64(e.target.files[0]);
            promise.then(function(result) {
                
             setData((prevData) => {
                return{
                    ...prevData,
                    [e.target.name]: result
                }
        })})}
        if(e.target.value === ""){
            setValidated((prev) => {
                return{
                    ...prev,
                    [e.target.name]: true
                }
            })
        }
        else{
            setValidated((prev) => {
                return{
                    ...prev,
                    [e.target.name]: false
                }
            })
        }
        setData((prev)=>{
            return{
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const {mutate: handlesubmit, isPending} = useMutation({
        mutationFn: async () => {
            if(validated.name || validated.email || validated.password || validated.smptpass || data?.name == undefined || data?.email == undefined || data?.smptpass == undefined || data?.password == undefined){
                setValidated({
                    name: validated.name ? true : false,
                    email: validated.email ? true : false,
                    password: validated.password ? true : false,
                    smptpass: validated.smptpass ? true : false,
                })
                alert('validate')
            }
            else{
                await axios.post('api/registre', { data: data })
            }
        },
        onSuccess: () => {
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Account Created !' });
        },
        onError: () => {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
        }
    })

  return (
    <div className="md:p-[50px] dark">
        <Toast ref={toast} />
        <h1 className="text-3xl md:text-6xl font-bold mb-[35px] hero-text">Create An Account</h1>
        <div className="md:flex">
            <div className="flex-1 px-4">
                <div className="flex">
                    <Input label="Name" errorMessage={validated.name ? "Please Enter a name" : ""} isInvalid={validated.name} onChange={(e) => handlechange(e)} onBlur={(e) => handlechange(e)} name="name" className={`my-3 me-3 rounded-full`} radius="full"/>
                    <Input label="Email" errorMessage={validated.email ? "Please Enter an email" : ""} onChange={(e) => handlechange(e)} onBlur={(e) => handlechange(e)} isInvalid={validated.email} name="email" className={`my-3 me-3 rounded-full`} radius="full"/>
                </div>
                
                <Input label="SMTP Password" errorMessage={validated.smptpass ? "Please Enter your SMTP pass" : ""} isInvalid={validated.smptpass} onChange={(e) => handlechange(e)} onBlur={(e) => handlechange(e)} name="smptpass" className={`my-3 me-3 rounded-full`} radius="full"/>
                <Input
                    label="Password"
                    placeholder="Enter your password"
                    errorMessage={validated.password ? "Please Enter a password" : ""}
                    isInvalid={validated.password}
                    onChange={(e) => handlechange(e)}
                    onBlur={(e) => handlechange(e)}
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
                    className={`my-6 rounded-full`}
                    radius="full"
                />
                <SInput name="image" onChange={(e) => handlechange(e)} id="picture" type="file" />
                <Button disabled={isPending} variant="shadow" color="primary" onClick={handlesubmit} className="w-full my-4 rounded-full">Registre</Button>
            </div>
            <div className="flex-1 bg-black w-full">

            </div>
        </div>
        
    </div>
  )
}
