import axios from "axios";
import { CartInfo } from "../types/Bigcommerce";

export const getProductUrl = (productId: string): string => {
  return `${process.env.BIGCOMMERCE_API_URL}/${process.env.BIGCOMMERCE_STORE_ID}/v3/catalog/products/${productId}?include=primary_image,images`;
}



export const createCart = async (customerId: number, products: any[]): Promise<CartInfo | any> => {
  const items: any[] = []
  for (const product of products) {
    items.push({
      "quantity": product.quantity,
      "product_id": product.productId
    })
  }

  const body = JSON.stringify({
    "line_items": items,
    "customer_id": customerId,
    "locale": "en-US"
  });

  const url = `${process.env.BIGCOMMERCE_API_URL}/${process.env.BIGCOMMERCE_STORE_ID}/v3/carts?include=redirect_urls`

  return await axios.post(url, body, {
    headers: {
      'x-auth-token': `${process.env.BIGCOMMERCE_TOKEN}`,
    }
  }).then(response => {
    return new CartInfo(response.data.data.id, response.data.data.redirect_urls.checkout_url)
  }).catch(error => {
    console.log(error)
  })
}