import React, { useRef, useEffect, useState, useCallback, useContext } from 'react'
import Player from '@vimeo/player'
import Mute from './buttons/Mute'
import Play from './buttons/Play'
import Marker from './buttons/Marker'
import Layout from './Layout'
import Scrubber from './Scrubber'
import Timer from './Timer'
import CommentMarker from './buttons/CommentMarker'
import { SessionData } from './data/Context'
import { buttonStyle, commentStyle, videoTitle, r3, r4, p2, p3, p1 } from './styles.js'

export default function VimeoPlayer({ setMarker, marker, markers, setShowComment, setPlayBackComments, time, currentTime, setCurrentTime }) {
  const container = useRef(document.createElement('div'))
  const player = useRef()
  const [ready, setReady] = useState(false)
  const [duration, setDuration] = useState()
  const videoID = useContext(SessionData).video
  const input = useRef('')
  const [theTitle, setTitle] = useState("")

  const videoRef = useCallback(node => {
    if (node !== null) {
      node.appendChild(container.current)
    }
  }, [])
  function getTitle() {
    player.current.getVideoTitle().then(function(title) {
        console.log(title)
        setTitle(title)
      }
    )
  }

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
      getTitle()
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
          <Layout>
            <div ref={videoRef}></div>
            <div style={p1}>
            <div style={r3}>
              <div style={videoTitle}>{theTitle}</div>
                <Play player={player} onPause={setMarker} setCurrentTime={setCurrentTime} currentTime={currentTime}/>
                <Mute player={player}/>
                <button style={buttonStyle} onClick={() => {
                    setPlayBackComments(false)
                    setCurrentTime(0)
                    player.current.setCurrentTime(0)
                  }}>reset</button>
                  </div>
                  </div>
                <div style={p3}>
                <CommentMarker player={player} setMarker={setMarker} marker={marker} />

                </div>
              </Layout>
          </>
        }
    </div>
  )
}
