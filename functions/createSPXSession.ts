import { Handler } from "@netlify/functions";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { createRoom } from "../lib/utils/twilio";

const prisma = new PrismaClient();

const handler: Handler = async (event, context) => {
  if (event.body) {
    const { guestId } = JSON.parse(event.body);

    const sessionId = randomUUID();
    const roomId = `${sessionId}_${guestId}`;
    const roomUrl = await createRoom(roomId);

    const session = await prisma.sPXSession.create({
      data: {
        id: sessionId,
        start: new Date(),
        status: 'reserved',
        guest: {
          connect: {
            username: guestId
          }
        },
        host: {
          connect: {
            username: 'host@gluo.mx'
          }
        },
        videoSession: {
          create: {
            roomId: roomId,
            roomUrl: roomUrl,
            createdAt: new Date()
          }
        }
      }
    });
    return {
      statusCode: 200,
      body: JSON.stringify({'sessionId': session.id}),
    };
  } else {
    return {
      statusCode: 409,
      body: JSON.stringify({'error': 'No guest id provided'}),
    };
  }
};

export { handler };
