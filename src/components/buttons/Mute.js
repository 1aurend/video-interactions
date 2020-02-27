import React, { useState } from 'react'

export default function MuteButton(props) {
  const { player } = props
  const [ volume, setVolume ] = useState(1)
  const buttonText = volume > 0 ? 'mute' : 'umute'

  const muteUnmute = () => {
    player.current.setVolume(1-volume)
    setVolume(1-volume)
  }

  return <button onClick={muteUnmute}>{buttonText}</button>
}
