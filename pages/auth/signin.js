import { getProviders, getSession, getCsrfToken, signIn  } from "next-auth/react"
import { Grid, Container, Spacer, Input, Button, Text, Link, Loading, Image } from '@nextui-org/react';
import { useRef, useState } from 'react'

export default function SignIn({ csrfToken }) {
  const usernameRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState(false)
  const [loader, setLoader] = useState()

  const loginHandler = async (e) => {
    e.preventDefault()
    setLoader(true)
    const { error } = await signIn('credentials', {
      redirect: false,
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      callbackUrl: '/',
    })
    setLoader(false)
    if (error) setError(error)
  }

  return (
    <> 
    <Spacer y={5}/>
    <div className="cmp-container__gray">
      <div className="cmp-container__logo">
        <Image width={80} src="https://i.ibb.co/V2WwP22/logo-gluo.png" objectFit="fill" />
      </div>
      <Grid.Container gap={2} justify="center">
        <Grid xs={8} md={3}>
          <Container display="grid" align="left" justify="flex-start" lg alignItems="stretch">
            <Spacer y={2}/>
            <Text size="2rem" weight="bold">LOGIN</Text>
            <Spacer/>
            <form onSubmit={(e) => loginHandler(e)}>
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <label>
                <Input clearable fullWidth="true" name="username" type="text" placeholder="Username" size="lg" ref={usernameRef}/>
              </label>
              <Spacer/>
              <label>
                <Input.Password clearable fullWidth="true" name="password" type="password" placeholder="Password" size="lg" ref={passwordRef}  />
              </label>
              <Spacer/>
              <Link color="secondary" href="#">
                Forgot your password?
              </Link>
              <Spacer/>
              <Text size="1.rem" color="error">{error}</Text>       
              <Button type="submit" color="secondary" size="lg">Log in
                { loader && <Spacer x={3}/> &&
                  <Loading type="points" color="currentColor" size="md" />
                }
              </Button>
              <Spacer />
              <Text color="#828188">Do not have an account?&nbsp;
                <Link color="secondary" href="#">Sign up here</Link>
              </Text>            
            </form>
            <Spacer y={2}/>
            </Container>
        </Grid>
      </Grid.Container>
    </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/auth/signin" },
    };
  }

  return {
    props: {
      providers: await getProviders(context),
      csrfToken: await getCsrfToken(context),
    },
  };
}