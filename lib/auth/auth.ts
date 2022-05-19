import base_client from '../utils/base-functions'

export const login = (username: string, password: string) => {
  return base_client.post('/login', JSON.stringify({ 'username': username, 'password': password }))
}

export const get_profile = (username: string) => {
  return base_client.post('/getProfile', JSON.stringify({ 'username': username}))
}

export const get_video_token = (username: string, roomId: string) => {
  return base_client.post('/generateVideoCallToken', JSON.stringify({
    'username': username,
    'roomId': roomId
  }))
}