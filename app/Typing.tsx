'use client'
import { title } from 'process'
import { useEffect, useState } from 'react'

export default function TypingEffect({ text }: { text: string }) {
  const [index, setIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1))
        setIndex(index + 1)
      }
    }, 90)

    return () => clearTimeout(timeoutId)
  }, [index, text])

  return (
    <h4>
      <span>{displayText}</span>
    </h4>
  )
}
