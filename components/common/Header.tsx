
import { Container, Spacer, Row, Text, User as UserUI, Button, Grid, Card } from '@nextui-org/react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { User } from '../../lib/types/Users';
import { useSPXSession } from '../../lib/session/get-session'
const Header = () => {
  const { data: session } = useSession()
  
  var user: User | null = null;
  if (session && session.user) {
    user = session.user.image as unknown as User;
  }

  const { data, error } = useSPXSession('1a8a3872-4d87-4f47-acb3-c76f1efe5582', {});

  if (user) {

    return (
      <Grid.Container gap={2} justify="center">
        <Grid xs={6}>
          <Text h1 size={40} color='gray'>SPX</Text>

        </Grid>
      <Grid xs={6} alignContent="flex-end" justify='flex-end' >
      <UserUI
                bordered
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                name={user?.username}
                description={user.type}
                color="primary"
            />
            <Button auto color="primary" rounded onClick={() => signOut()}>
              Sign out
            </Button>
      </Grid>
      </Grid.Container>

    )
  } else {
    return (
      <Container >
        <Row justify="center" align="center">
          <Text h1 size={40} color='gray'>SPX</Text>
          <Spacer x={1} />
        </Row>
      </Container>
    )
  }
}

export default Header