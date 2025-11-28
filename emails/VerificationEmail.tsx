import {
    Html,
    Head,
    Preview,
    Heading,
    Row,
    Text,
    
}from "@react-email/components";

interface VerificationEmailProps {
    username: string; 
    otp: string;
}

export default function VerificationEmail ({username, otp}: VerificationEmailProps) {
    return (
        <Html lang="en" dir="ltr">
            <Head>
                <title>Verification Code</title>
            
            </Head>
            <Preview>Here&apos;s your verification code: {otp}</Preview>
            <section>
                <Row>
                    <Heading as="h2"> Hellow{username}</Heading>
                </Row>

                <Row>
                    <Text>
                        Thank you for registering. Please use the following verification code to complete your registration:
                    </Text>
                </Row>

                <Row>
                    <Text>{otp}</Text>
                </Row>

                <Row>
                    <Text>
                        If you did not request this code, please ignore this email.
                    </Text>
                </Row>
            </section>

        </Html>
    )
}