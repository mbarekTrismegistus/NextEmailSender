"use client"


import {getLocalTimeZone, parseDate, today} from "@internationalized/date";
import { Button, DatePicker, Select, SelectItem } from "@nextui-org/react";
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
                    sender: session.data.user.email,
                    html: html || undefined,
                    template: template || undefined
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
        <p className="text-5xl font-bold hero-text">Schedule An Email</p>
        <DatePicker
          label="Date and time"
          minValue={today(getLocalTimeZone())}
          defaultValue={date}
          value={date}
          onChange={setDate}
        />
        <Select onChange={(e) => handleChange(e)} label="choose A template or to Write HTML">
            <SelectItem key={"mainmail"} value={"mainmail"}>
                Main Email
            </SelectItem>
            <SelectItem key={"secondMail"} value={"secondMail"}>
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
                className={`max-h-[400px] min-h-[400px] overflow-y-scroll rounded-xl text-[16px] cm-scrollbar ${isVisible ? "block" : "hidden"}`}
                extensions={htmlLang()}
                
              />
        <TagsInput
            value={selected}
            onChange={setSelected}
            name=""
            placeHolder="Enter Emails"
            classNames={"emails"}
        />
        <Button color="primary" onClick={handleSend}>Send</Button>
    </div>
  )
}
