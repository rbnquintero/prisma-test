import axios from "axios";

export const createRoom = async (roomName: string): Promise<string> => {
  return axios.post('https://video.twilio.com/v1/Rooms', null, {
    params: {
      Type: "go",
      UniqueName: roomName,
    },
    headers: {
      'Authorization': `Basic ${process.env.TWILIO_AUTH_TOKEN}`,
    }
  }).then(response => {
    return response.data.url
  })
}