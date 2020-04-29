import React, { useRef, useEffect, useState, useCallback, useContext } from 'react'
import Player from '@vimeo/player'
import Mute from './buttons/Mute'
import Play from './buttons/Play'
import Marker from './buttons/Marker'
import Scrubber from './Scrubber'
import Timer from './Timer'
import CommentMarker from './buttons/CommentMarker'
import { SessionData } from './data/Context'
import { buttonStyle, commentStyle } from './styles.js'

export default function VimeoPlayer({ setMarker, marker, markers, setShowComment, setPlayBackComments, time, currentTime, setCurrentTime }) {
  const container = useRef(document.createElement('div'))
  const player = useRef()
  const [ready, setReady] = useState(false)
  const [duration, setDuration] = useState()
  const videoID = useContext(SessionData).video
  const input = useRef('')

  const videoRef = useCallback(node => {
    if (node !== null) {
      node.appendChild(container.current)
    }
  }, [])

  useEffect(() => {
    (async () => {
       player.current = await new Player(container.current, {
          id: videoID,
          width: '1000px',
          height: '600px',
          controls: false,
          autoplay: false,
          muted: false
        })
      player.current.getDuration().then( secs => {
        setDuration(secs)
      })
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
          <Mute player={player}/>
          <Play player={player} onPause={setMarker} setCurrentTime={setCurrentTime} currentTime={currentTime}/>

          <div style={{marginTop: '1%'}}>
            {/*<Marker player={player} setMarker={setMarker} marker={marker} type={'in'}/>
          <Marker player={player} setMarker={setMarker} marker={marker} type={'out'}/>*/}
            <CommentMarker player={player} setMarker={setMarker} marker={marker} />
          </div>
          <button style={buttonStyle} onClick={() => {
              setPlayBackComments(false)
              setCurrentTime(0)
              player.current.setCurrentTime(0)
            }}>reset!</button>
          </>
        }
    </div>
  )
}
