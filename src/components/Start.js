import React, { useState, useContext } from 'react'
import { updateSessionData } from './data/Context'
import VideoMachine from './VideoMachine'
import { commentStyle, buttonStyle, inputStyle, titleStyle } from './styles.js'

export default function StartMenu() {
  const [username, setUsername] = useState('')
  const [vimeoID, setVimeoID] = useState('371464763')
  const updateSession = useContext(updateSessionData)
  const [loadVideo, setLoad] = useState(false)

  const onGo = () => {
    updateSession({type: 'setSessionID'})
    updateSession({type: 'setUsername', name: username})
    updateSession({type: 'setVideoID', id: vimeoID})
    setLoad(true)
  }

  if (loadVideo) {
    return <VideoMachine />
  }
  return (
    <div>
      <h2 style={titleStyle}>Video Interaction Machine</h2>
      <p style={commentStyle}>Enter a Username and Vimeo Video ID to begin!</p>
      <input style={inputStyle} type='text' placeholder='username' value={username} onChange={e => setUsername(e.target.value)}></input>
      <input style={inputStyle} type='text' placeholder='video ID' value={vimeoID} onChange={e => setVimeoID(e.target.value)}></input>
      <button style={buttonStyle} onClick={onGo}>go!</button>
    </div>
  )
}
