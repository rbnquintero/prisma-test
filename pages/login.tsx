import type { NextPage } from 'next';
import { useSession, signIn, signOut } from 'next-auth/react';
import { User } from '../lib/types/Users';
import { Button, Text, Card, Container, Row } from '@nextui-org/react';

//import { VideoGuest } from '../components/videocall/TwilioVideoView';

const Login: NextPage = () => {
  const { data: session } = useSession()

  if (session && session.user) {
    const user = session.user.image as unknown as User;
    
    return (
      <>
        <h1>Welcome {user.name} {user.lastname}</h1>
        Signed in as {user.type} <br />
        <Button onClick={() => signOut()}>Sign out</Button>
      </>
    )
  }
  return (
    <>
      <Container>
        <Card >
            <Row justify="center" align="center">
              <Text h2>Not signed in</Text>
            </Row>
            <Row justify="center" align="center"> 
              <Button onClick={() => signIn()}>Sign in</Button>
            </Row>
        </Card>
      </Container>
    </>
  )
}

export default Login;