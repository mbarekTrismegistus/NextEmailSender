"use client"

import { Input, Skeleton, Button } from '@nextui-org/react';
import { Html, render } from '@react-email/components';
import { useMutation } from '@tanstack/react-query';
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react';
import { TagsInput } from 'react-tag-input-component'
import { Toast } from 'primereact/toast';
import axios from 'axios';


export default function page(params) {

  const [selected, setSelected] = useState([]);
  const [isMounted, setMounted] = useState(false)
  const [subject, setSubject] = useState("")

  const toast = useRef(null);

  const Mail = dynamic(() => import(`../../../emails/${params.params.mailname}`), { ssr: false })

  useEffect(() => {
    if(Mail){
      setMounted(true)
    }
  },[])

  
  const email = <Html lang="en" dir="ltr"><Mail/></Html>


  const {mutate: send, isPending} = useMutation({
      mutationFn: async() => {
          let html = render(email)
          await axios.post("/api/sendemail" , { data: {
              html: html,
              emails: selected,
              subject: subject,
              template: params.params.mailname
          } })
      },
      onSuccess: () => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Email Sent !' });
      },
      onError: () => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      }

  })

  return (
    <div className='flex gap-4 p-5'>
        <Toast ref={toast} />
        <div className='flex-1'>
          <p className='md:text-3xl font-bold mb-[30px] hero-text'>Email Informations</p>
          <p className='mb-4 ms-2'>Recievers</p>
          <TagsInput
            value={selected}
            onChange={setSelected}
            name=""
            placeHolder="Enter Emails"
          />
          <p className='my-4 ms-2'>Subject</p>
          <Input size='sm' label="Subject" name='subject' onValueChange={setSubject} value={subject} radius='full' classNames={{inputWrapper: "border-1 border-zinc-500"}}/>
          <Button color='primary' isDisabled={isPending} isLoading={isPending} variant='shadow' className='mx-auto my-4 text-center block' onClick={() => send()}>Send</Button>

        </div>
        <div className='max-h-[500px] flex-1 overflow-scroll scrollbar'>
          <p className='md:text-3xl font-bold mb-[30px] hero-text'>Template Display</p>
          {
            isMounted ?
              <Mail/>
            :
            <Skeleton className='h-[500px]'/>
          }
        </div>
        
    </div>
  )
}
