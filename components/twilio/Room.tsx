// Room.js
import Participant from './Participant'
import { useRoom } from 'use-twilio-video'
import { Key, useEffect } from 'react'

export function Room ({ token, roomName } : { token: string, roomName: string }) {
  const { room, error, connectRoom, disconnectRoom, localParticipant, remoteParticipants, dominantSpeaker, isCameraOn, toggleCamera, isMicrophoneOn, toggleMicrophone } = useRoom()

  
  useEffect(() => {
    if (!room && token && roomName) {
      connectRoom({ token, options: { name: roomName, dominantSpeaker: true } })
      return () => disconnectRoom()
    }
  }, [connectRoom, disconnectRoom, room, roomName, token])

  // ... other

  // usage example in simple component
  if (room) {
    return (
      <div>
        <div>
          <button onClick={() => disconnectRoom()}>disconnect</button>
          <button onClick={() => toggleCamera()}>
            {isCameraOn ? 'turn off camera' : 'turn on camera'}
          </button>
          <button onClick={() => toggleMicrophone()}>
            {isMicrophoneOn ? 'turn off mic' : 'turn on mic'}
          </button>
        </div>

        <div>Local participant: {JSON.stringify(localParticipant?.identity)}</div>
        <Participant participant={localParticipant} />

        <div>
          Remote participants:{' '}
          {JSON.stringify(remoteParticipants.map((v: { identity: any }) => v.identity))}
        </div>

        <div>Dominant speaker: {JSON.stringify(dominantSpeaker?.identity)}</div>

        <div>
          {remoteParticipants.map((p: Key | null | undefined) => (
            <Participant participant={p} key={p}/>
          ))}
        </div>
      </div>
    )
  } else {
    return <></>
  }
}