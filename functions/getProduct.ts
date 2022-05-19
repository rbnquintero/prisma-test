import { Handler } from "@netlify/functions";
import axios from 'axios';

import { getProductUrl } from '../lib/utils/bigcommerce'

const handler: Handler = async (event, context) => {
  if (event.body) {
    const productId = JSON.parse(event.body).productId
    const response = await axios.get(getProductUrl(productId), {
      headers: {
        'x-auth-token': `${process.env.BIGCOMMERCE_TOKEN}`,
      }
    })
    const product = response.data;
    return {
      statusCode: 200,
      body: JSON.stringify(product),
    };
  }
  return {
    statusCode: 409,
    body: JSON.stringify({'error': 'No product id provided'}),
  }
};

export { handler };
