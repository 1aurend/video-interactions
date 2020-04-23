import React, { useRef, useEffect, useState, useCallback, useContext } from 'react'
import Player from '@vimeo/player'
import { Dispatch } from './data/Context'
import { buttonStyle } from './styles.js'


export default function Still({ time, moveOneFrame, setSegment, setMarker }) {
  const container = useRef(document.createElement('div'))
  const player = useRef()
  const [ready, setReady] = useState(false)

  const videoRef = useCallback(node => {
    if (node !== null) {
      node.appendChild(container.current)
    }
  }, [])

  useEffect(() => {
    (async () => {
       player.current = await new Player(container.current, {
          id: '371464763',
          width: '500px',
          height: '300px',
          controls: false,
          autoplay: true,
          muted: true
        })
        player.current.pause()
    })()
  }, [])

  useEffect(() => {
    console.log('time in effect: ' + time)
    if (time === 'reset') {
        setReady(false)
    } else if (time) {
      player.current.pause()
      player.current.setCurrentTime(time).then( secs => console.log(`set video time to ${secs}`))
      setReady(true)
    }
  }, [time])

  return (
    <>
        {ready &&
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'top', marginLeft: '50px'}}>
          <div ref={videoRef}></div>
          <button style={buttonStyle} onClick={() => moveOneFrame({type: 'bwdFrame'})}>previous frame</button>
          <button style={buttonStyle} onClick={() => moveOneFrame({type: 'fwdFrame'})}>next frame</button>
          <button
            style={buttonStyle}
            onClick={() => {
              setSegment({type: 'setInPoint', time: time})
              setMarker({type: 'reset'})}
            }
            >
            save
          </button>
          </div>
        }
    </>
  )
}
