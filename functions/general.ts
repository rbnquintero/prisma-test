import { Handler } from "@netlify/functions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler: Handler = async (event, context) => {
  const allUsers = await prisma.sPXHost.findMany();
  return {
    statusCode: 200,
    body: JSON.stringify(allUsers),
  };
};

export { handler };
