import { Html, Button, Heading, Row, Img, Column, Tailwind, Body, Container, Text, Section, Head, Font, Link } from "@react-email/components";
import { TripleColumn, DualColumn } from "responsive-react-email";

export default function New(props){
  return (
         <Tailwind>
            <Container className={`mx-auto max-w-[600px] bg-white`}>
                <Section className="bg-[#0A0F4F]">
                  <Row>
                    <Img width={150} src="https://brosmedia41a4.b-cdn.net/wp-content/uploads/2023/10/logo.jpg.bv_resized_desktop.jpg.bv.webp?bv_host=brosmedia.ma">
                    </Img>

                  </Row>
                </Section>
                <Section className="w-[250px]">
                  <Row>
                    <Text className="font-[900] text-white text-center text-md bg-[#0A0F4F]">
                      OFFRE DE DIGITALE MARKETING
                    </Text>
                  </Row>
                </Section>
                <Section>
                  <Row>
                    <Column className="px-[20px]">
                      <Text className="font-black text-start text-lg text-[#0A0F4F] ">
                        Bonjour cher <span className="text-[#E30D2A]">client</span>
                      </Text>
                    </Column>
  
                  </Row>
                </Section>
                <Section className="px-5">
                  <Row>
                    <Column className="text-[#0A0F4F] px-[20px]">
                      <Text className="mt-0">
                        Explorez de nouvelles possibilités avec BrosMedia ! Découvrez nos tarifs attractifs pour le marketing digital, adaptés à vos besoins. Choisissez BrosMedia pour :
                      </Text>
                      <Text className="my-0">
                        🌟 Compétitivité
                      </Text>
                      <Text className="my-0">
                        🚀 Expertise  
                      </Text>
                      <Text className="my-0">
                        💼 Personnalisation
                      </Text>
                      <Text className="my-0">
                        🔒 Confiance
                      </Text>
                    </Column>
                  </Row>
                  <Row>
                    <Column className="px-[20px]">
                      <Text className="font-black text-start text-lg text-[#0A0F4F] mb-0">
                        Chez BrosMedia, nous vous proposons : 
                      </Text>
                    </Column>
                  </Row>
                  <Row>
                    <Column className="px-[20px]">
                      <Text className="text-[#0A0F4F]">
                        <span className="font-black">Stratégie Digitale Personnalisée : </span>Des plans sur mesure pour atteindre vos objectifs en ligne.
                      </Text>
                      <Text className="text-[#0A0F4F]">
                        <span className="font-black">SEO & PPC : </span>Optimisation de votre présence en ligne et gestion de vos campagnes publicitaires.
                      </Text>
                      <Text className="text-[#0A0F4F]">
                        <span className="font-black">Contenu Engageant : </span>Création de contenu captivant pour susciter l'intérêt de votre audience.
                      </Text>
                      <Text className="text-[#0A0F4F]">
                        <span className="font-black">Gestion des Réseaux Sociaux : </span>Animation de vos comptes pour renforcer votre visibilité et votre engagement.
                      </Text>
                      <Text className="text-[#0A0F4F]">
                        <span className="font-black">Analyse & Reporting : </span>Suivi des performances et fourniture de rapports détaillés pour optimiser votre stratégie.
                      </Text>
                    </Column>
                  </Row>
                </Section>
                <Section className="text-white py-5 bg-[#0A0F4F]"  >
                    <Row>
                      <Column className="px-[20px]">
                        <Text className="text-white">
                          Avec BrosMedia, boostez votre présence en ligne et atteignez vos objectifs marketing !
                        </Text>
                      </Column>
                    </Row>
                    <Row>
                      <TripleColumn
                        columnOneContent={
                          <>
                            <Row>
                              <Text className="font-black text-lg text-white">
                                Contact Us : 
                              </Text>
                            </Row>
                            <Row>
                              <Text className="m-0 font-black text-lg text-white">
                                05 39 91 02 13
                              </Text>
                            </Row>
                            <Row>
                              <Text className="m-0 font-black text-lg text-white">
                                06 71 88 49 68
                              </Text>
                            </Row>
                          </>
                          
                        }
                        columnOneStyles={{maxWidth: "100px",textAlign: "left", paddingLeft: "20px", float:"left"}}
                        columnTwoContent={
                          <Row className="align-top">
                            <Text className="font-black text-lg text-[#25d366]">
                              Via Whatsapp : 
                            </Text>
                            <Text className="text-[#25d366] font-black text-lg m-0">
                              (+212) 671884968
                            </Text>
                            <Text className="text-[#25d366] m-0">
                              Clicker sur le lien suivant
                            </Text>
                            <Link href="/">
                              <Img src="https://static.whatsapp.net/rsrc.php/v3/y7/r/DSxOAUB0raA.png" width={"150px"}/>
                            </Link>
                        </Row>
                        }
                        columnTwoStyles={{maxWidth: "100px",textAlign: "left", paddingLeft: "20px", float:"left"}}
                        columnThreeContent={
                          <Row>
                            <Img src="https://i.ibb.co/F8D6zXk/Untitled-1.png" width={"130px"}/>
                          </Row>
                        }
                        columnThreeStyles={{maxWidth: "100px",textAlign: "left", paddingTop: "30px", paddingLeft: "20px", float:"left"}}
                      />
                    </Row>
                </Section>
                <Section className="bg-[#E30D2A]">
                  <Row className="text-start" style={{marginRight:"auto", display: "inline-block", paddingLeft:"20px"}}>
                    <DualColumn
                      columnOneContent={
                        <>
                              <Column>
                                <Text className="p-[23px] py-[15px] bg-[white] inline-block rounded-full">
                                  E
                                </Text>
                              </Column>
                              <Column  >
                                <Text className="ms-3 m-0 text-white text-start">Official Email</Text>
                                <Text className="ms-3 m-0 text-white font-bold">
                                  Contact@brosmedia.ma
                                </Text>
                              </Column>
                        </>
                      }
                     
                      columnOneStyles={{paddingLeft: "0px", display: "block", textAlign: "left"}}
                      columnTwoStyles={{paddingLeft: "0px", display: "block", textAlign: "left"}}
                      columnTwoContent={
                        
                        <Column className="">
                          <Section>
                            <Row>
                              <Column>
                                <Text className="p-[20px] py-[15px] bg-[white] inline-block text-center text-black rounded-full">
                                  W
                                </Text>
                              </Column>
                              <Column>
                                <Text className="ms-3 m-0 text-white text-start">Official Website</Text>
                                <Link href="https://brosmedia.ma" className="ms-3 m-0 text-white font-bold">
                                  <span className="ms-3">
                                    brosmedia.ma
                                  </span>
                                </Link>
                              </Column>
                            </Row>
                            

                          </Section>
                        </Column>
                      }
                    />
                  </Row>
                </Section>
            </Container>
          </Tailwind>

  );
};