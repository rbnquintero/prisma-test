import { NextPage, GetStaticProps } from 'next';
import { useState } from 'react';
import Head from 'next/head'
import { useSPXSession } from '../lib/session/get-session'
import { useProduct } from '../lib/products/get-product'
import styles from '../styles/Home.module.css'
import { useSession, signIn, signOut } from 'next-auth/react';
import { User } from '../lib/types/Users';

import { Container, Card, Grid, Image, Text, Spacer, Row, Col, Button } from '@nextui-org/react';

import Header from '../components/common/Header';
import Result from '../components/search/Results';
import Cart from '../components/common/Cart';
import { VideoHost } from '../components/videocall/TwilioVideoView';

// Search components
import {
  InstantSearch,
  SearchBox,
  Hits,
  Configure
} from 'react-instantsearch-hooks-web';
import algoliasearch from 'algoliasearch/lite';
import { SPXSession, SPXVideoSession } from '@prisma/client';
const searchClient = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!, process.env.NEXT_PUBLIC_ALGOLIA_TOKEN!);

const Home: NextPage = () => {
  const { data: session } = useSession()

  var user: User | null = null;
  var sPXSession: SPXSession | null = null;
  var sessionId: string | null = null;
  var videoSession: SPXVideoSession | null = null;
  if (session && session.user) {
    user = session.user.image as unknown as User;
    if (user.session) {
      const unknownSession = user.session as any;
      sPXSession = unknownSession as SPXSession;
      sessionId = sPXSession.id;
      if (unknownSession.videoSession) {
        videoSession = unknownSession.videoSession as unknown as SPXVideoSession;
      }
    }
  }

  const { data: sessionData, error: sessionError } = useSPXSession(`${sessionId}`, sPXSession);

  const { data: productData, error: productError } = useProduct('1952');

  const [visibleSearch, setVisibleSearch] = useState(false);

  if (user && sPXSession) {
    return (
      <>
        <Head>
          <title>SPX - Gluo Store</title>
          <meta name="description" content="Shared Purchase Experience" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header/>

        <Grid.Container gap={2} justify="center">
          <Grid xs={3}>
            <Card>
              <Container gap={0}>
                <Row gap={1}>
                  <VideoHost videoToken={user.videoToken!} videoSession={videoSession}/>
                </Row>
                <Row>
                  <div className={styles.container}>
                    Username: {user?.username}
                    <br />
                    Username: {JSON.stringify(sessionData)}
                  </div>
                </Row>
              </Container>
            </Card>
          </Grid>
          <Grid xs={6}>
            <Card>
              <Container gap={0}>
                <Row>
                  <Text h3> Products view</Text>
                </Row>
                  <Spacer y={1}/>
                  <Card bordered>
                    <InstantSearch 
                        indexName="bigcommerce_gluomx"
                        searchClient={searchClient}>
                      <Row>
                        <SearchBox placeholder='Type your search here' />
                      </Row>
                      <Row>
                        <Hits hitComponent={Result}/>
                      </Row>
                      <Configure hitsPerPage={10}/>
                    </InstantSearch>
                  </Card>
                <Image
                  width={320}
                  height={180}  
                  src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fc.stocksy.com%2Fa%2FrIb100%2Fz9%2F381725.jpg&f=1&nofb=1"
                  alt="Default Image"
                  objectFit="cover"
                />
              </Container>
            </Card>
          </Grid>
          <Grid xs={3}>
            <Card>
              <Container gap={0}>
              <Cart></Cart>
              </Container>
            </Card>
          </Grid>
        </Grid.Container>
      </>
    );
  } else if (user) {
    return (
      <>
        <Header/>
        No active session found
      </>
    )
  } else if (session === null) {
    return (
      <>
        <Header/>
        Not signed in <br />
        <Button onClick={() => signIn()} color="secondary" size="lg">Log in</Button>
      </>
    )
  } else {
    return (
      <>
        <Header/>
        Loading...
      </>
    )
  }
}

export default Home
