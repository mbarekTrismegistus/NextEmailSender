"use client"

import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import {Button, Skeleton} from "@nextui-org/react";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from '@uiw/codemirror-theme-dracula';
import { html as htmlLang } from '@codemirror/lang-html';
import { TagsInput } from "react-tag-input-component";
import { Toast } from 'primereact/toast';
import axios from 'axios';


export default function RawHtmlSender() {
  const [html, setHtml] = useState('');
  const [selected, setSelected] = useState([]);
  const [isMounted, setIsMounted] = useState(false)
  const toast = useRef(null);


  const {mutate: send, isPending} = useMutation({
    mutationFn: async() => {
      await axios.post("/api/sendemail" , { data: {
        html: html,
        emails: selected
      }})
    },
    onSuccess: () => {
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Email sent !' });
    },
    onError: () => {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
    }

  })


  useEffect(() => {
    setIsMounted(true)
  },[])
  
  return (
    <div className='mx-auto md:p-[50px] p-[30px] md:px-[120px]'>
      <h1 className='font-bold text-5xl text-center my-3'>Send Email using html</h1>
      <Toast ref={toast} />
      <TagsInput
        value={selected}
        onChange={setSelected}
        name=""
        placeHolder="Enter Emails"
        classNames={"emails"}
        
        
      />

        <div className='min-h-[400px]'>
            <p>Write your code here :</p>
            {isMounted ? 
              <CodeMirror
                value={html}
                theme={dracula}
                onChange={(e) => setHtml(e)}
                className="max-h-[400px] min-h-[400px] overflow-y-scroll rounded-xl scrollbar"
                extensions={htmlLang()}
              />
            :
            <Skeleton className='max-h-[400px] min-h-[400px] overflow-y-scroll rounded-xl '/>
            }
        </div>
      
      <Button isDisabled={isPending} color='primary' variant='shadow' className='mx-auto my-4 text-center block' onClick={() => send()}>send</Button>
    </div>
  )
}
