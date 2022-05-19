import { LegacyRef, useEffect, useRef } from 'react'
import { Track } from '../../lib/types/Twilio'

export default function AudioTrack ({ track } : { track: Track }) {
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

  return <audio ref={r} />
}    