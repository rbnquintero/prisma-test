import { Handler } from "@netlify/functions";
const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant; 

const handler: Handler = async (event, context) => {
  if (event.body) {    
    const username = JSON.parse(event.body).username
    const roomId = JSON.parse(event.body).roomId
    const accessToken = new AccessToken(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_API_KEY,
      process.env.TWILIO_API_SECRET,
      { identity: username }
    )

    const videoGrant = new VideoGrant({
      room: roomId,
    });

    accessToken.addGrant(videoGrant)

    return {
      statusCode: 200,
      body: JSON.stringify({token: accessToken.toJwt()}),
    };
  }
  return {
    statusCode: 409,
    body: JSON.stringify({'error': 'Invalid username.'}),
  }
};

export { handler };