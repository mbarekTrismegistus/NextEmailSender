import { Html, Button, Heading, Row, Column, Tailwind, Body, Container, Text, Section } from "@react-email/components";

export default function Email(){
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Body className="mx-auto my-auto px-2 ">
            <Container className="border border-solid rounded bg-[#111111] border-[#eaeaea] mx-auto my-5 max-w-[500px]">
                <Section>
                    <Row className="p-[15px]">
                        <Column>
                            <Text className="text-white text-3xl font-bold ms-5">Welcome</Text>
                        </Column>
                        <Column>
                            <Text className="text-white text-end me-5">Welcome</Text>
                        </Column>
                    </Row>
                </Section>
                <Section style={{backgroundImage: "url('https://images.unsplash.com/photo-1622886083536-67ff308dbe14?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",  backgroundSize: "cover"}} className="p-5">
                    <Row >
                        <Text className="text-black text-3xl font-bold text-center">Welcome</Text>
                        <Text className="text-black text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis obcaecati, dolor at accusamus illo, dolorum accusantium blanditiis minima mollitia dolores doloribus voluptas temporibus animi libero nobis, provident assumenda fuga maiores.</Text>
                    </Row>
                    <Row>
                        <Column className="text-center ">
                            <Button href="https://example.com" className="text-center bg-[#000000] px-4 py-3 rounded font-medium leading-4 text-white">
                                Click me
                            </Button>
                        </Column>
                    </Row>
                </Section>
            </Container>
        </Body>
      </Tailwind>
      
    </Html>
  );
};