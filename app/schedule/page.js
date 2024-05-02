"use client"


import {getLocalTimeZone, parseDate, today} from "@internationalized/date";
import { Button, DatePicker, Input, Select, SelectItem } from "@nextui-org/react";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from '@uiw/codemirror-theme-dracula';
import { githubLight } from '@uiw/codemirror-theme-github';
import { html as htmlLang } from '@codemirror/lang-html';
import { useState } from "react";
import { TagsInput } from "react-tag-input-component";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";


export default function page() {
    const [date, setDate] = useState(today(getLocalTimeZone()).add({ days: 1}))
    const [html, setHtml] = useState(null)
    const [subject, setSubject] = useState("")
    const [isVisible, setVisible] = useState(false)
    const [selected, setSelected] = useState([]);
    const [template, setTemplate] = useState(null)

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

    const {mutate: handleSend, isPending} = useMutation({
        mutationFn: async () => {
            await axios.post('/api/ScheduleEmail', {
                data: {
                    date: date.toDate(),
                    userId: Number(session.data.user.id),
                    recievers: selected,
                    sender: session.data.user.name,
                    html: html || undefined,
                    template: template || undefined,
                    subject: subject
                }
            })
        }
    })
    

  return (
    session.status == "loading" 
    ?
    "loading"
    :
    <div className="p-[50px]">
        <p className="text-5xl font-bold hero-text mb-[40px]">Schedule An Email</p>
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
            <SelectItem key={"new"} value={"new"}>
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
        <p className="font-bold text-lg my-3 mt-[20px]">Entre Receivers</p>
        <TagsInput
            value={selected}
            onChange={setSelected}
            name=""
            placeHolder="Enter Emails"
            classNames={"emails"}
        />
        <Button color="primary" className="my-5" onClick={handleSend}>Send</Button>
    </div>
  )
}
