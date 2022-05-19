// VideoTrack.js
import { LegacyRef, useEffect, useRef } from 'react'
import { Track } from '../../lib/types/Twilio'

export const VideoTrack = ({ track } : { track: Track }) => {
  const ref = useRef()

  useEffect(() => {
    if (track) {
      const el = ref.current
      track.attach(el)

      return () => {
        track.detach(el)
      }
    }
  }, [track])

  const r = ref as unknown as LegacyRef<any> | undefined

  return <video style={{ maxWidth: '100%' }} ref={r} />
}