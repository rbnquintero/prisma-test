import axios from 'axios';

export const fetcherGet = (url: string) => axios.get(url).then(res => res.data);

export const fetcherGetWithToken = (url: string, token: string) => axios.get(url, { headers: { 'x-auth-token': `${token}` } }).then(res => res.data);

export const fetcherPost = (url: string, body: any) => axios.post(url, body).then(res => res.data);

export const fetcherPostSimple = (url: string) => axios.post(url).then(res => res.data);