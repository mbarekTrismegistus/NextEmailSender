"use client"

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import {Button, Textarea, select} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { TagsInput } from "react-tag-input-component";
import axios from 'axios';


export default function RawHtmlSender() {
  const [html, setHtml] = useState('')
  const [email, setEmail] = useState('')
  const [selected, setSelected] = useState([]);

  let code = `${html}`

  const {mutate: send} = useMutation({
    mutationFn: async() => {
      await axios.post("/api/sendemail" , { data: html})
    },
    onSuccess: () => {
        console.log("done")
    }

  })
  
  return (
    <div className='dark mx-auto p-[50px] px-[120px]'>
      <h1 className='font-bold text-5xl text-center my-3'>Send Email using html</h1>
      <TagsInput
        value={selected}
        onChange={setSelected}
        name=""
        placeHolder="Enter Emails"
        classNames={"emails"}
      />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
            <p>Code Display</p>
            <SyntaxHighlighter language="html" className="max-h-[400px] min-h-[400px]" style={atomOneDark}>
                {code}
            </SyntaxHighlighter>
        </div>

        <div className='min-h-[400px]'>
            <p>Write your code here :</p>
            <CodeMirror
              value={html}
              theme={vscodeDark}
              onChange={(e) => setHtml(e)}
              className="max-h-[400px] min-h-[400px] overflow-y-scroll"
            />
        </div>
      </div>
      
      <Button color='primary' variant='shadow' className='mx-auto my-4 text-center block' onClick={() => send()}>send</Button>
    </div>
  )
}
