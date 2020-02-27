import React, { useState, useEffect } from 'react'

export default function PlayButton(props) {
  const { player } = props
  const [ playing, setPlaying ] = useState(false)
  const buttonText = playing ? 'pause' : 'play'

  useEffect(() => {
    player.current.on('play', () => {
      setPlaying(true)
    })
    player.current.on('pause', () => {
      setPlaying(false)
    })
    const thisPlayer = player.current
    return () => {
      thisPlayer.off('play')
      thisPlayer.off('pause')
    }
  }, [player])

  const playPause = () => {
    switch (playing) {
    case false:
      player.current.play()
      setPlaying(true)
      break
    case true:
      player.current.pause()
      setPlaying(false)
      break
    default:
      alert('oops! a playback error occurred')
      break
    }
  }

  return <button onClick={playPause}>{buttonText}</button>
}
