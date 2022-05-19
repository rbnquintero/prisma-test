
import { Container, Spacer, Row, Text, Button, Grid, Card, Col, Image, Divider, Input} from '@nextui-org/react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { User } from '../../lib/types/Users';
import { useSPXSession } from '../../lib/session/get-session'
const Cart = () => {
  const { data: session } = useSession()
  
  var user: User | null = null;
  if (session && session.user) {
    user = session.user.image as unknown as User;
  }

  const { data, error } = useSPXSession('1a8a3872-4d87-4f47-acb3-c76f1efe5582', {});
    return (      
        <Card css={{ backgroundColor: "$white" }}>   
          <Row><Text h3 color="$black">Shopping Cart</Text></Row>
          <Spacer/>
          <Divider />
          <Spacer/>
          {/* INIT -> Shopping Cart Item*/}           
          <Row>                   
            <Grid.Container gap={1}>
              <Grid sm={6}>
                <Image
                  src="https://nextui.org/images/card-example-3.jpeg"
                  objectFit="cover"
                  width={200}
                  height={150}
                />    
              </Grid>    
              <Grid sm={6}>
                <Col>
                  <Text h5 color="$black">LC2 PETIT MODELE ARMCHAIR</Text>
                  <Text h6 color="#696969">SKU 273437</Text>
                  <Spacer y={2}/>
                  <Row gap={1}>
                    <Text h5 weight="bold" color="$black">$5,260.98</Text>
                    <Input 
                      size="xs"
                      labelLeft="-" 
                      placeholder="1" 
                      labelRight="+" 
                    />
                  </Row>
                  <Button
                      size="xs"
                      color="error"                      
                    >Delete</Button>
                </Col>
              </Grid>                                                
            </Grid.Container>
          </Row>
          {/* END -> Shopping Cart Item*/}     
          {/* INIT -> Shopping Cart Item*/}           
          <Row>                   
            <Grid.Container gap={1}>
              <Grid sm={6}>
                <Image
                  src="https://nextui.org/images/card-example-3.jpeg"
                  objectFit="cover"
                  width={200}
                  height={150}
                />    
              </Grid>    
              <Grid sm={6}>
                <Col>
                  <Text h5 color="$black">LC2 PETIT MODELE ARMCHAIR</Text>
                  <Text h6 color="#696969">SKU 273437</Text>
                  <Spacer y={2}/>
                  <Row gap={1}>
                    <Text h5 weight="bold" color="$black">$5,260.98</Text>
                    <Input 
                      size="xs"
                      labelLeft="-" 
                      placeholder="1" 
                      labelRight="+" 
                    />
                  </Row>
                  <Button
                      size="xs"
                      color="error"                      
                    >Delete</Button>
                </Col>
              </Grid>                                                
            </Grid.Container>
          </Row>
          {/* END -> Shopping Cart Item*/}               
        </Card>
    )
}

export default Cart