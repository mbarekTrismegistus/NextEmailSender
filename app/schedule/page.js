"use client"


import {getLocalTimeZone, parseDate, today} from "@internationalized/date";
import { Button, DatePicker, Input, Select, SelectItem } from "@nextui-org/react";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from '@uiw/codemirror-theme-dracula';
import { githubLight } from '@uiw/codemirror-theme-github';
import { html as htmlLang } from '@codemirror/lang-html';
import { useRef, useState } from "react";
import { TagsInput } from "react-tag-input-component";
import { useMutation } from "@tanstack/react-query";
import { Input as Shadcvinput } from '@/components/ui/input';
import axios from "axios";
import { useSession } from "next-auth/react";
import readXlsxFile from "read-excel-file";
import { Toast } from 'primereact/toast';


export default function page() {
    const [date, setDate] = useState(today(getLocalTimeZone()).add({ days: 1}))
    const [html, setHtml] = useState(null)
    const [subject, setSubject] = useState("")
    const [file, setFile] = useState([])
    const [isVisible, setVisible] = useState(false)
    const [selected, setSelected] = useState([]);
    const [template, setTemplate] = useState(null)
    const toast = useRef(null);

    const session = useSession()
    function handleChange(e){
        if(e.target.value === "html"){
            setVisible(true)
            setTemplate(null)
        }
        else{
            setVisible(false)
            setHtml(null)
            setTemplate(e.target.value)
        }
    }
    let day = date.day
    let month = date.month
    let year = date.year
    let str = new Date(date) 
    console.log(str)

    const {mutate: handleSend, isPending} = useMutation({
        mutationFn: async () => {
            let emails = selected.concat(file)
            let day = date.day
            let month = date.month
            let year = date.year
            await axios.post('/api/ScheduleEmail', {
                
                data: {
                    date: new Date(date),
                    userId: Number(session.data.user.id),
                    recievers: emails,
                    sender: session.data.user.name,
                    html: html || undefined,
                    template: template || undefined,
                    subject: subject
                }
            })
        },
        onSuccess: async() => {

            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Email Scheduled !' });
          },
        onError: async() => {
            toast.current.show({ severity: 'error', summary: 'Error', detail: `Something went wrong` });
          }
    })
    

  return (
    session.status == "loading" 
    ?
    "loading"
    :
    <div className="p-[50px]">
        <Toast ref={toast} />
        <p className="text-5xl font-bold hero-text mb-[40px]">Schedule An Email</p>
        <div className="px-5">

            <div className="flex gap-4">
                <div className="flex-1">
                    <p className="font-bold text-lg mb-3">Date</p>
                    <DatePicker
                    label="Date and time"
                    minValue={today(getLocalTimeZone()).add({ days: 1})}
                    defaultValue={date}
                    value={date}
                    onChange={setDate}
                    />
                </div>
                <div className="flex-1">
                    <p className="font-bold text-lg mb-3">Subject</p>
                    <Input label="Subject" name="subject" value={subject} onValueChange={setSubject}/>
                </div>
            </div>
            <p className="font-bold text-lg my-3 mt-[40px]">Choose A template or to Write HTML</p>
            <Select onChange={(e) => handleChange(e)} label="choose A template or to Write HTML" className="mb-4">
                <SelectItem key={"main"} value={"main"}>
                    Main Email
                </SelectItem>
                <SelectItem key={"new"} value={"offredm"}>
                    Second Email
                </SelectItem>
                <SelectItem key={"html"} value={"html"}>
                    Write HTML
                </SelectItem>
            </Select>
            <CodeMirror
                    value={html || undefined}
                    theme={dracula}
                    onChange={(e) => setHtml(e)}
                    className={`max-h-[400px] my-4 min-h-[400px] overflow-y-scroll rounded-xl text-[16px] cm-scrollbar ${isVisible ? "block" : "hidden"}`}
                    extensions={htmlLang()}
                    
                />

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
            <Button color="primary" className="my-5" isLoading={isPending} isDisabled={isPending} onClick={handleSend}>Add</Button>
        </div>
    </div>
  )
}
