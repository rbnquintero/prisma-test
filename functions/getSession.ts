import { Handler } from "@netlify/functions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler: Handler = async (event, context) => {
  if (event.body) {
    const sessionId = JSON.parse(event.body).sessionId
    const sPXSession = await prisma.sPXSession.findUnique({
      where: {
        id: sessionId
      },
      include: {
        guest: true,
        host: true,
        cart: true,
        wishList: true,
        viewedProducts: true,
        videoSession: true
      }
    })
    return {
      statusCode: 200,
      body: JSON.stringify(sPXSession),
    };
  }
  return {
    statusCode: 409,
    body: JSON.stringify({'error': 'No session id provided'}),
  }
};

export { handler };
