import React, { useState, useContext } from 'react'
import { updateSessionData } from './data/Context'
import VideoMachine from './VideoMachine'


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
      <h2>Video Interaction Machine</h2>
      <p>enter a username and Vimeo video ID to begin</p>
      <input type='text' placeholder='username' value={username} onChange={e => setUsername(e.target.value)}></input>
      <input type='text' placeholder='video ID' value={vimeoID} onChange={e => setVimeoID(e.target.value)}></input>
      <button onClick={onGo}>go!</button>
    </div>
  )
}
