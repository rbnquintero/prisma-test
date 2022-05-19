import { Handler } from "@netlify/functions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler: Handler = async (event, context) => {
  if (event.body) {
    const body = JSON.parse(event.body)
    const sessionId = body.sessionId
    const productData = body.productData
    const { productId, productName, productUrl } = productData
    const sPXSession = await prisma.sPXSession.findUnique({
      where: {
        id: sessionId
      },
      include: {
        guest: true,
        host: true,
        cart: true,
        wishList: true,
        viewedProducts: true
      }
    })
    if (sPXSession) {
      for (const u of sPXSession.wishList) {
        if (u.productId === productId) {
          await prisma.sPXSessionWishlist.update({
            where: {
              id: u.id
            },
            data: {
              quantity: u.quantity + 1
            }
          })
          return {
            statusCode: 200
          };
        }
      }
      await prisma.sPXSessionWishlist.create({
        data: {
          sessionId: sessionId,
          productId: productId,
          date: new Date(),
          quantity: 1,
          productName: productName,
          productUrl: productUrl
        }
      })
      return {
        statusCode: 200
      };
    }
  }
  return {
    statusCode: 409,
    body: JSON.stringify({'error': 'No session id provided'}),
  }
};

export { handler };
