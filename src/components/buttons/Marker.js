import React from 'react'

export default function Marker(props) {
  const { player, setMarker, marker, type } = props
  console.log(marker);
  const buttonText = !type ? 'add marker' : marker ? 'clear ' + type + ' point' : 'set ' + type + ' point'

  const setClear = () => {
    if (type) {
      switch (marker) {
      case null:
        player.current.pause()
        player.current.getCurrentTime().then( secs => {
          console.log(`paused at ${secs} secs`)
          setMarker({type: 'set', secs: secs})
        })
        return
      default:
        setMarker({type: 'clear'})
        return
      }
    }
    player.current.pause()
    player.current.getCurrentTime().then( secs => {
      console.log(`paused at ${secs} secs`)
      setMarker({type: 'set', secs: secs})
    })
  }

  return <button onClick={setClear}>{buttonText}</button>
}
