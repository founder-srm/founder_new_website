'use client'
import { useEffect, useRef } from 'react'
import '@/app/styling/chips.module.css'

export default function BackgroundVideo() {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.loop = true
      videoRef.current.muted = true
      videoRef.current.playsInline = true
      videoRef.current.autoPlay = true
      videoRef.current.src = '/chips.mp4'
      videoRef.current.load()
      videoRef.current.play()

      return () => {
        if (videoRef.current) {
          videoRef.current.pause()
        }
      }
    }
  }, [])

  return <video className="videos" ref={videoRef} />
}
