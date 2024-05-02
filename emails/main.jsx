import { Html, Button, Heading, Row, Img, Column, Tailwind, Body, Container, Text, Section } from "@react-email/components";


export default function Email(props){
  return (
    
         <Tailwind>
            <Container className={`border border-solid rounded bg-[${props.Color || "#ffffff"}] border-[#eaeaea] mx-auto my-5 max-w-[500px]`}>
                <Section>
                    <Row className="p-[15px] bg-[#0A0F4F]">
                        <Column>
                            <Img src="https://brosmedia41a4.b-cdn.net/wp-content/uploads/2023/10/logo.jpg.bv_resized_desktop.jpg.bv.webp?bv_host=brosmedia.ma" alt="Cat" width="200" />
                        </Column>
                        <Column className='text-end'>
                            
                            <Button href='#' className='bg-[#CF1C1C] py-2 px-4 m-3 text-white'>
                                Contact
                            </Button>
                            
                        </Column>
                    </Row>
                </Section>
                <Section style={{backgroundImage: "url('https://brosmedia41a4.b-cdn.net/wp-content/uploads/2023/10/background-1.jpg?bv_host=brosmedia.ma')",  backgroundSize: "cover"}} className="p-5">
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
                            <Img src='https://brosmedia41a4.b-cdn.net/wp-content/uploads/2024/01/1-1-1024x933.jpg.bv_resized_desktop.jpg.bv.webp?bv_host=brosmedia.ma' width={"100%"}/>
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
                            <Img src='https://brosmedia41a4.b-cdn.net/wp-content/uploads/2024/01/2-1024x933.jpg.bv_resized_desktop.jpg.bv.webp?bv_host=brosmedia.ma'  width={"100%"}/>
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
                            <Img src='https://brosmedia41a4.b-cdn.net/wp-content/uploads/2024/01/33-1024x933.jpg.bv_resized_desktop.jpg.bv.webp?bv_host=brosmedia.ma' width={"100%"}/>
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
                    <Row>
                        <Button href='https://brosmedia.ma/community-manager-maroc/' className='block bg-[#CF1C1C] py-3 mx-5 text-center'>
                            See More
                        </Button>
                    </Row>
                    
                </Section>
            </Container>
      </Tailwind>

  );
};