"use client"

import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import {Button, Input, Skeleton} from "@nextui-org/react";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from '@uiw/codemirror-theme-dracula';
import { githubLight } from '@uiw/codemirror-theme-github';
import { html as htmlLang } from '@codemirror/lang-html';
import { TagsInput } from "react-tag-input-component";
import { Toast } from 'primereact/toast';
import { useTheme } from 'next-themes';
import readXlsxFile from 'read-excel-file';
import { Input as Shadcvinput } from '@/components/ui/input';
import axios from 'axios';


export default function RawHtmlSender() {
  const [html, setHtml] = useState('');
  const [subject, setSubject] = useState('')
  const [selected, setSelected] = useState([]);
  const [file, setFile] = useState([])
  const [isMounted, setIsMounted] = useState(false)
  const toast = useRef(null);
  const {theme} = useTheme()


  const {mutate: send, isPending} = useMutation({
    mutationFn: async() => {
      let emails = selected.concat(file)
      let res = await axios.post("/api/sendemail" , { data: {
        html: html,
        emails: emails,
        subject: subject,
        file: file
      }})
      return res
    },
    onSuccess: async(data) => {
      console.log(data)
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Email sent !' });
    },
    onError: async(res) => {
      console.log(res)
      toast.current.show({ severity: 'error', summary: 'Error', detail: `Something went wrong ${res.response.data.message}` });
    }

  })

  


  useEffect(() => {
    setIsMounted(true)
  },[])
  return (
    <div className='mx-auto md:p-[50px] p-[30px] md:px-[100px]'>
      <Toast ref={toast} />
        <h1 className='font-bold text-5xl py-5 leading-12 hero-text'>Send Email using html</h1>
        <div className='gap-4 mt-[30px] mb-[30px] mx-10 items-center'>
          <div className='flex gap-4 items-center'>
            <div className='flex-1'>
              <p className='mb-4 mt-[30px] ms-2 text-xl font-bold'>Emails</p>
              <TagsInput
                value={selected}
                onChange={setSelected}
                name=""
                placeHolder="Enter Emails"
              />
            </div>
            or
            <div className='flex-1'>
              <p className='mb-4 mt-[30px] ms-2 text-xl font-bold'>Import from excel file</p>
              <Shadcvinput className="border-1 dark:border-zinc-600 border-zinc-700 pt-3 pb-8" type='file' name='file' onChange={(e) => readXlsxFile(e.target.files[0]).then((rows) => {
                let data = () => {
                  let emails = []
                  rows.map((r) => {
                    r.map((c) => {
                      if(c && c.includes("@")){
                        emails.push(c)                        
                      }
                    })
                    
                  })
                  return emails
                }
                setFile(data)
                }).catch((err) => {
                  toast.current.show({ severity: 'error', summary: 'Error', detail: 'Format not supported (only .xlsx supported)' });
                })
              }
              />
            </div>
          </div>
          <div>
            <p className='mb-3 mt-[30px] ms-2 text-xl font-bold'>Subject</p>
            <Input label="subject" size='md' onChange={(e) => setSubject(e.target.value)} value={subject} classNames={{inputWrapper: "border-1 dark:border-zinc-600 border-zinc-700", label: "ms-2", input: "ms-2"}} variant='bordered' name='subject'/>
          </div>
          
            
        </div>
        <div className='min-h-[400px] mx-10'>
            <p className='mb-4'>Write your code here :</p>
            {isMounted ? 
              <CodeMirror
                value={html}
                theme={dracula}
                onChange={(e) => setHtml(e)}
                className="max-h-[400px] min-h-[400px] border-1 border-slate-500 dark:border-slate-700 overflow-y-scroll rounded-xl text-[16px] cm-scrollbar"
                extensions={htmlLang()}
              />
            :
            <Skeleton className='max-h-[400px] min-h-[400px] overflow-y-scroll rounded-xl before:!duration-1000'/>
            }
        </div>
        <Button isDisabled={isPending} isLoading={isPending} color='primary' variant='shadow' className='mx-auto my-4 text-center block' onClick={() => send()}>send</Button>

      </div>
  )
}
