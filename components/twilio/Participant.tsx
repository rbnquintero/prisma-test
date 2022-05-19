// Participant.js
import AudioTrack from './AudioTrack'
import { VideoTrack } from './VideoTrack'
import { useTrack } from 'use-twilio-video'

function Participant ({ participant } : { participant: any }) {
  const { videoOn, audioOn, videoTrack, audioTrack } = useTrack({ participant })

  return (
    <div>
      {videoOn ? <VideoTrack track={videoTrack} /> : 'video off'}
      <br />
      {audioOn ? <AudioTrack track={audioTrack} /> : 'audio off'}
    </div>
  )
}

export default Participant