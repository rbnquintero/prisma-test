import { Handler } from "@netlify/functions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler: Handler = async (event, context) => {    
  if (event.body) {    
    const username = JSON.parse(event.body).username
    const password = JSON.parse(event.body).password
    const sPXUser = await prisma.sPXUser.findFirst({
      where: {
        username: username,
        password: password
      }
    })
    if(sPXUser)
        return {
        statusCode: 200,
        body: JSON.stringify(username),
        };
  }
  return {
    statusCode: 409,
    body: JSON.stringify({'error': 'Invalid user or password'}),
  }
};

export { handler };
