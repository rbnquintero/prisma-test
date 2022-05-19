import useSWR, { SWRResponse } from 'swr';

import { fetcherPost } from '../utils/fetch'

export const useSPXSession = (sessionId: string, initialSession: any): SWRResponse => {
  return useSWR(['/lambda/getSession', JSON.stringify({ sessionId })], fetcherPost, {
    fallbackData: initialSession
  });
}