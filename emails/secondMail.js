import { Html, Button, Heading, Row, Img, Column, Tailwind, Body, Container, Text, Section } from "@react-email/components";


export default function SecondEmail(props){
  return (
    
         <Tailwind>
        <Container className={`border border-solid rounded bg-[${props.Color || "#ffffff"}] border-[#eaeaea] mx-auto my-5 max-w-[500px]`}>
                <Section>
                    <Row className=''>
                        email 2
                    </Row>
                </Section>
            </Container>
      </Tailwind>

  );
};