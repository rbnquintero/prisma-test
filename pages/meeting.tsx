import type { NextPage } from "next";
import Head from "next/head";
import { useSession, signIn } from "next-auth/react";
import { User } from "../lib/types/Users";
import { useSPXSession } from "../lib/session/get-session";
import { Container, Card, Button, Row, Checkbox, Text, Input, Spacer} from "@nextui-org/react";
import Header from "../components/common/Header";
import { InputLabel, NativeSelect, FormControl, Box } from "@mui/material";
//import { useMeeting } from '../lib/meetings/set-meeting'


const handleSubmit = async (event: any) => {
  event.preventDefault()
  const dataMeeting = {
    authors: event.target.authors.value,
    date: event.target.date.value,
    time: event.target.time.value,
    genres: event.target.genres.value
  }
  //const submit = useMeeting( dataMeeting);
  //alert(JSON.stringify(dataMeeting));
};



const Meeting: NextPage = () => {
  const { data: session } = useSession();

  var user: User | null = null;
  if (session && session.user) {
    user = session.user.image as unknown as User;
  }

  const { data, error } = useSPXSession('1a8a3872-4d87-4f47-acb3-c76f1efe5582', {});

  if (user && user.type === "guest") {
    return (
      <>
        <Head>
          <title>SPX - Gluo Store</title>
          <meta name="description" content="Shared Purchase Experience" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <form onSubmit={handleSubmit} method="post">
          <Spacer y={1} />
          <Container>
            <Card>
              <Row justify="center" align="center">
                <Checkbox.Group
                  size="sm"
                  isRow
                  color="primary"
                  label="Select your favorites genres"
                  id="genres" 
                  name="genres"
                >
                  <Checkbox value="thriller.">Thriller.</Checkbox>
                  <Checkbox value="fantasy">Fantasy</Checkbox>
                  <Checkbox value="romance">Romance</Checkbox>
                  <Checkbox value="sci">Science Fiction</Checkbox>
                  <Checkbox value="self">Self Help</Checkbox>
                  <Checkbox value="history">History</Checkbox>
                </Checkbox.Group>
              </Row>
              <Spacer y={1.5} />
              <Row justify="center" align="center">
                <Input
                  underlined
                  labelPlaceholder="Favorites authors"
                  color="default"
                  width="600px"
                  id="authors"
                  name="authors"
                />
              </Row>
              <Spacer y={1.5} />
              <Row justify="center" align="center">
                <Input
                  underlined
                  width="600px"
                  label="Date of meeting"
                  type="date"
                  id="date"
                  name="date"
                />
              </Row>
              <Spacer y={1.5} />
              <Row justify="center" align="center">
                <Box sx={{ minWidth: 600 }}>
                  <FormControl fullWidth>
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      Time
                    </InputLabel>
                    <NativeSelect
                      defaultValue={30}
                      inputProps={{
                        name: "time",
                        id: "uncontrolled-native",
                      }}
                    >
                      <option value={1}>1:00 pm</option>
                      <option value={2}>2:00 pm</option>
                      <option value={3}>3:00 pm</option>
                      <option value={4}>4:00 pm</option>
                      <option value={5}>5:00 pm</option>
                    </NativeSelect>
                  </FormControl>
                </Box>
              </Row>

              <Spacer y={1.5} />
              <Row justify="center" align="center">
                <Button auto color="primary" rounded type="submit">
                  Register now
                </Button>
              </Row>
            </Card>
          </Container>
        </form>
      </>
    );
  }
  return (
    <>
      <Header/>
      <Container>
        <Card>
          <Row justify="center" align="center">
            <Text h2>Not signed in</Text>
          </Row>
          <Row justify="center" align="center">
            <Button auto color="primary" rounded onClick={() => signIn()}>Sign in</Button>
          </Row>
        </Card>
      </Container>
    </>
  );
};

export default Meeting;
