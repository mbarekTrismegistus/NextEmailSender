import { Button, Card, CardBody, CardFooter, CardHeader, Image } from "@nextui-org/react";
import Email from "../email";


export default function Choose() {
  return (
    <div className="md:flex">
        <Card className="dark flex-1 mx-5">
            <CardHeader>
                nigga
            </CardHeader>
            <CardBody className="max-h-[300px]">
                <Email/> 
            </CardBody>
            <CardFooter>
                <Button variant="bordered" color="secondary">Choose</Button>
            </CardFooter>
        </Card>
        <Card className="dark flex-1 mx-5">
            <CardHeader>
                nigga
            </CardHeader>
            <CardBody>
                lorem ipsum delur lorem ipsum delur 
            </CardBody>
            <CardFooter>
                <Button variant="bordered" color="secondary">Choose</Button>
            </CardFooter>
        </Card>
        <Card className="dark flex-1 mx-5">
            <CardHeader>
                nigga
            </CardHeader>
            <CardBody>
                lorem ipsum delur lorem ipsum delur 
            </CardBody>
            <CardFooter>
                <Button variant="bordered" color="secondary">Choose</Button>
            </CardFooter>
        </Card>
    </div>
  )
}
