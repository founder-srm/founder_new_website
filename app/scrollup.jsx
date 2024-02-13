import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

const ScrollUp = ({ children }) => {
  const controls = useAnimation()

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 })
  }, [controls])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ duration: 1.3, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

export default ScrollUp
