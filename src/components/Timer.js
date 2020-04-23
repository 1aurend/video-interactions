import React, { useEffect, useState, useContext } from 'react'
import { Playing } from './data/Context'
import { commentStyle } from './styles.js'

export default function Timer({ player, setCurrentTime, currentTime }) {
  const playing = useContext(Playing)

  useEffect(() => {
    const timer = setInterval(() => {
      player.current.getCurrentTime().then( secs => setCurrentTime(secs))
    }, 42)
    if (!playing) {
      clearInterval(timer)
    }
    return () => clearInterval(timer)
  }, [setCurrentTime, player, playing])

  return (
    <p style={commentStyle}>Time: {currentTime}</p>
  )
}
