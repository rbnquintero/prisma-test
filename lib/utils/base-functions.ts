import axios from 'axios'

let base_client = axios.create({
  baseURL:process.env.FUNCTION_BASE_URL??'',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
})


export default base_client