import React, { useRef, useEffect, useState, useCallback } from 'react'
import Player from '@vimeo/player'
import Mute from './buttons/Mute'
import Play from './buttons/Play'
import Marker from './buttons/Marker'
import Scrubber from './Scrubber'


export default function VimeoPlayer({ setMarker, marker, markers }) {
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
          width: '1000px',
          height: '600px',
          controls: false,
          autoplay: false,
          muted: true
        })
      setReady(true)
    })()
  }, [])

  return (
    <div>
        {ready &&
          <>
          <div ref={videoRef}></div>
          <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
            <Scrubber markers={markers} />
          </div>
          <Play player={player} onPause={setMarker}/>
          <Mute player={player}/>
          <div style={{marginTop: '1%'}}>
            <Marker player={player} setMarker={setMarker} marker={marker} type={'in'}/>
            <Marker player={player} setMarker={setMarker} marker={marker} type={'out'}/>
            <Marker player={player} setMarker={setMarker} marker={marker} />
          </div>
          </>
        }
    </div>
  )
}
