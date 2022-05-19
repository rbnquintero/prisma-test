import { Handler } from "@netlify/functions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler: Handler = async (event, context) => {
  if (event.body) {
    const body = JSON.parse(event.body)
    const sessionId = body.sessionId
    const productData = body.productData
    const { productId } = productData
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
          if (u.quantity > 1) {
            await prisma.sPXSessionWishlist.update({
              where: {
                id: u.id
              },
              data: {
                quantity: u.quantity - 1
              }
            })
            return {
              statusCode: 200
            };
          } else {
            await prisma.sPXSessionWishlist.delete({
              where: {
                id: u.id
              }
            })
            return {
              statusCode: 200
            };
          }
        }
      }
    }
  }
  return {
    statusCode: 409,
    body: JSON.stringify({'error': 'No session id provided'}),
  }
};

export { handler };
