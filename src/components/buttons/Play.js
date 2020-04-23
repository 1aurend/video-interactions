import React, { useState, useEffect, useContext } from 'react'
import Timer from '../Timer'
import { Playing, SetPlaying } from '../data/Context'
import { buttonStyle } from '../styles.js'

export default function PlayButton(props) {
  const { player, currentTime, setCurrentTime } = props
  const playing = useContext(Playing)
  const setPlaying = useContext(SetPlaying)
  const buttonText = playing ? 'pause' : 'play'
  console.log(playing);

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
  }, [player, setPlaying])

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
      console.log('oops! a playback error occurred')
      break
    }
  }

  return (
    <>
    <div>
      <button style={buttonStyle} onClick={playPause}>{buttonText}</button>
    </div>
    <div>
      <Timer player={player} playing={playing} currentTime={currentTime} setCurrentTime={setCurrentTime} />
    </div>
    </>
  )
}
