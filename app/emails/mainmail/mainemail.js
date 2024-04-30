"use client"

import React, { useState } from 'react'
import { Html, Button, Heading, Row, Column, Tailwind, Body, Container, Text, Section, Img } from "@react-email/components";
import { Button as ButtonUi } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { render } from '@react-email/render';
import axios from 'axios';
import Email from '@/emails/main';



export default function Mainemail() {

    const [text, setText] = useState("")
    const [Color, setColor] = useState("#222222")

    const email = <Html lang="en" dir="ltr"><Email text={text} color={Color}/></Html>


    const {mutate: send} = useMutation({
        mutationFn: async() => {
            let html = render(email)
            await axios.post("/api/sendemail" , { data: {
                html: html,
                emails: ["cns2023bros@gmail.com"]
            } })
        },
        onSuccess: () => {
            console.log("done")
        }

    })

  return (
    <div>
        <input onChange={(e) => setText(e.target.value)}/>
        <input type='color' onChange={(e) => setColor(e.target.value)}/>
      <Tailwind>
        <Container className={`border border-solid rounded bg-[${Color}] border-[#eaeaea] mx-auto my-5 max-w-[500px]`}>
                <Section>
                    <Row className="p-[15px] bg-[#0A0F4F]">
                        <Column>
                            <Img src="logo.webp" alt="Cat" width="200" />
                        </Column>
                        <Column className='text-end'>
                            <Button href='#' className='bg-[#CF1C1C] py-2 px-4 m-3 text-white'>
                                Contact
                            </Button>
                        </Column>
                    </Row>
                </Section>
                <Section style={{backgroundImage: "url('bg.jpg')",  backgroundSize: "cover"}} className="p-5">
                    <Row className=''>
                        <Text className="text-white text-4xl font-extrabold text-center pt-[40px]">BrosMedia</Text>
                        <Text className="text-white text-xl text-center px-5 pt-3 pb-5">
                            nunc sed velit dignissim sodales ut eu sem integer vitae nunc sed velit dignissim sodales ut eu sem integer vitae
                        </Text>
                    </Row>
                </Section>
                <Section className="bg-white pt-5"> 
                    <Row>
                        <Column className='text-center p-3 pt-[30px] px-[12px]'>
                            <Img src='https://brosmedia41a4.b-cdn.net/wp-content/uploads/2024/01/1-1-1024x933.jpg.bv_resized_desktop.jpg.bv.webp?bv_host=brosmedia.ma'/>
                            <Section>
                                <Text className='text-black font-black m-0 mb-3 text-xl'>ATTAQUE DE LA REINE</Text>
                                <Row>
                                    <Column className='text-[#CF1C1C] text-center align-top ps-2'>
                                        &#9632;
                                    </Column>
                                    <Column className='text-black text-start ps-2'>                                      
                                        Réseaux Facebook et Instagram.
                                    </Column>
                                </Row>
                                <Row>
                                    <Column className='text-[#CF1C1C] text-center align-top ps-2'>
                                        &#9632;
                                    </Column>
                                    <Column className='text-black text-start ps-2'>                                      
                                        Stratégie de développement .
                                    </Column>
                                </Row>
                                <Row>
                                    <Column className='text-[#CF1C1C] text-center align-top ps-2'>
                                        &#9632;
                                    </Column>
                                    <Column className='text-black text-start ps-2'>                                      
                                        3 articles innovants.
                                    </Column>
                                </Row>
                            </Section>
                        </Column>
                        <Column className='text-center p-3 pt-[30px] px-[12px]'>
                            <Img src='https://brosmedia41a4.b-cdn.net/wp-content/uploads/2024/01/1-1-1024x933.jpg.bv_resized_desktop.jpg.bv.webp?bv_host=brosmedia.ma'/>
                            <Section>
                                <Text className='text-black font-black m-0 mb-3 text-xl'>ATTAQUE DE LA REINE</Text>
                                <Row>
                                    <Column className='text-[#CF1C1C] text-center align-top ps-2'>
                                        &#9632;
                                    </Column>
                                    <Column className='text-black text-start ps-2'>                                      
                                        Réseaux Facebook et Instagram.
                                    </Column>
                                </Row>
                                <Row>
                                    <Column className='text-[#CF1C1C] text-center align-top ps-2'>
                                        &#9632;
                                    </Column>
                                    <Column className='text-black text-start ps-2'>                                      
                                        Stratégie de développement .
                                    </Column>
                                </Row>
                                <Row>
                                    <Column className='text-[#CF1C1C] text-center align-top ps-2'>
                                        &#9632;
                                    </Column>
                                    <Column className='text-black text-start ps-2'>                                      
                                        3 articles innovants.
                                    </Column>
                                </Row>
                            </Section>
                        </Column>
                        <Column className='text-center p-3 pt-[30px] px-[12px]'>
                            <Img src='https://brosmedia41a4.b-cdn.net/wp-content/uploads/2024/01/1-1-1024x933.jpg.bv_resized_desktop.jpg.bv.webp?bv_host=brosmedia.ma'/>
                            <Section>
                                <Text className='text-black font-black m-0 mb-3 text-xl'>ATTAQUE DE LA REINE</Text>
                                <Row>
                                    <Column className='text-[#CF1C1C] text-center align-top ps-2'>
                                        &#9632;
                                    </Column>
                                    <Column className='text-black text-start ps-2'>                                      
                                        Réseaux Facebook et Instagram.
                                    </Column>
                                </Row>
                                <Row>
                                    <Column className='text-[#CF1C1C] text-center align-top ps-2'>
                                        &#9632;
                                    </Column>
                                    <Column className='text-black text-start ps-2'>                                      
                                        Stratégie de développement .
                                    </Column>
                                </Row>
                                <Row>
                                    <Column className='text-[#CF1C1C] text-center align-top ps-2'>
                                        &#9632;
                                    </Column>
                                    <Column className='text-black text-start ps-2'>                                      
                                        3 articles innovants.
                                    </Column>
                                </Row>
                            </Section>
                        </Column>
                    </Row>
                    <Row className='w-[80%]'>
                        <Button href='#' className='block bg-[#CF1C1C] py-3 text-center'>
                            See More
                        </Button>
                    </Row>
                    
                </Section>
            </Container>
      </Tailwind>
      <ButtonUi color='primary' variant='shadow' className='mx-auto my-4 text-center block' onClick={() => send()}>send</ButtonUi>

    </div>
        
  )
}
