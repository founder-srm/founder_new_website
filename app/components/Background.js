'use client'
import { useEffect, useRef } from 'react'

export default function BackgroundVideo() {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.loop = true
      videoRef.current.muted = true
      videoRef.current.playsInline = true
      videoRef.current.autoPlay = true
      videoRef.current.src = '/background.mp4'
      videoRef.current.load()
      videoRef.current.play()

      return () => {
        if (videoRef.current) {
          videoRef.current.pause()
        }
      }
    }
  }, [])

  return (
    <video
      className=" absolute top-0 left-0 w-auto h-auto -z-10"
      ref={videoRef}
    />
  )
}
