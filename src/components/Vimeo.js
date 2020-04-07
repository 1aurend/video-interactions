import React, { useRef, useEffect, useState, useCallback, useContext } from 'react'
import Player from '@vimeo/player'
import Mute from './buttons/Mute'
import Play from './buttons/Play'
import Marker from './buttons/Marker'
import Scrubber from './Scrubber'
import Timer from './Timer'
import CommentMarker from './buttons/CommentMarker'
import {SessionData} from './data/Context'


export default function VimeoPlayer({ setMarker, marker, markers, setShowComment, time, currentTime, setCurrentTime }) {
  const container = useRef(document.createElement('div'))
  const player = useRef()
  const [ready, setReady] = useState(false)
  const [duration, setDuration] = useState()
  const updateSession = useContext(SessionData)

  const videoRef = useCallback(node => {
    if (node !== null) {
      node.appendChild(container.current)
    }
  }, [])

  useEffect(() => {
    (async () => {
       player.current = await new Player(container.current, {
          id: '371464763',
          width: '1000px',
          height: '600px',
          controls: true,
          autoplay: false,
          muted: true
        })
      player.current.getDuration().then( secs => {
        setDuration(secs)
      })
      updateSession({type: 'setVideoID', id: '371464763'})
      setReady(true)
    })()
  }, [])

  useEffect(() => {
    if (time) {
      player.current.pause()
      player.current.setCurrentTime(time).then(
        console.log('time set to' + time)
      )
    }
  }, [time])

  return (
    <div>
        {ready &&
          <>
          <div ref={videoRef}></div>
          <Scrubber markers={markers} duration={duration} setShowComment={setShowComment} />
          <Play player={player} onPause={setMarker} setCurrentTime={setCurrentTime} currentTime={currentTime}/>
          <Mute player={player}/>
          <div style={{marginTop: '1%'}}>
            {/*<Marker player={player} setMarker={setMarker} marker={marker} type={'in'}/>
          <Marker player={player} setMarker={setMarker} marker={marker} type={'out'}/>*/}
            <CommentMarker player={player} setMarker={setMarker} marker={marker} />
          </div>
          </>
        }
    </div>
  )
}
