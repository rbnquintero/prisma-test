import useSWR, { SWRResponse } from 'swr'

import { fetcherPost } from '../utils/fetch'

export const useProduct = (productId: string): SWRResponse => {
  return useSWR(['/lambda/getProduct', JSON.stringify({ productId })], fetcherPost);
}