import { Handler } from "@netlify/functions";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { CartInfo } from "../lib/types/Bigcommerce";
import { createCart } from "../lib/utils/bigcommerce";

const prisma = new PrismaClient();

const handler: Handler = async (event, context) => {
  if (event.body) {
    const { sessionId } = JSON.parse(event.body)
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
      // Create Bigcommerce cart
      const cartInfo: CartInfo = await createCart(sPXSession.guest.bigcommerceId, sPXSession.cart)
      await prisma.sPXSession.update({
        where: {
          id: sessionId
        },
        data: {
          status: 'completed',
          end: new Date(),
          bigcommerceCartId: cartInfo.cartId,
        }
      })

      return {
        statusCode: 200,
        body: JSON.stringify(cartInfo)
      };
    }
  }
  return {
    statusCode: 409,
    body: JSON.stringify({'error': 'No session id provided'}),
  }
};

export { handler };
