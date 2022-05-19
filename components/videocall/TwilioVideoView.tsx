import { SPXVideoSession } from '@prisma/client'
import { Room } from '../twilio/Room'

export const VideoHost = ({videoToken, videoSession} : {videoToken: string, videoSession: SPXVideoSession | null}) => {
  /*if (videoSession) {
    return (
      <>
        <h1>Video host</h1>
        <br />
        <Room token={`${videoToken}`} roomName={videoSession.roomId} />
      </>
    )
  }*/
  return <></>
}