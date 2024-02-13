'use client'
import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const FadeInContainer = styled.div`
  animation: ${fadeIn} 1.3s ease-in-out;
`

function FadeIn({ children }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(true)
    }, 50)

    return () => clearTimeout(timeoutId)
  }, [])

  return isVisible ? <FadeInContainer>{children}</FadeInContainer> : null
}

export default FadeIn
