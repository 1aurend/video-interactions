import React, { useEffect, useState, useContext } from 'react'
import { Playing } from './data/Context'


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
    <p>Time: {currentTime}</p>
  )
}
