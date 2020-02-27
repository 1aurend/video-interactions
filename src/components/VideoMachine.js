import React, { useState, useReducer, useEffect } from 'react'
import VimeoPlayer from './Vimeo'
import Still from './Still'
import Layout from './Layout'
import Scrubber from './Scrubber'

const segmentReducer = (segment, action) => {
  switch (action.type) {
  case 'setInPoint':
    return {...segment, in: action.time}
  case 'setOutPoint':
    return {...segment, out: action.time}
  default:
    alert("couldn't save marker; try again")
  }
}

const markerReducer = (marker, action) => {
  switch (action.type) {
  case 'set':
    return action.secs
  case 'fwdFrame':
    return marker+.04
  case 'bwdFrame':
    return marker-.04
  case 'clear':
    return null
  default:
    alert('failed to set marker; try again')
  }
}

export default function VideoMachine() {
  const [thisMarker, setMarker] = useReducer(markerReducer, null)
  const [markers, updateMarkers] = useState([])
  const [currentSegment, setCurrentSegment] = useReducer(segmentReducer, {in: '', out: '', angle: 'A'})

  useEffect(() => {
    if (thisMarker && thisMarker !== markers[markers.length-1]) {
      updateMarkers([...markers, thisMarker])
    }
  }, [thisMarker, markers])
  console.log(markers);

  return (
    <Layout>
      <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'left'}}>
        <VimeoPlayer setMarker={setMarker} marker={thisMarker} markers={markers}/>
      </div>
      {/*<Still time={marker} moveOneFrame={setMarker} setSegment={setCurrentSegment} setMarker={setMarker} />*/}
    </Layout>
  )
}


// const moveOneFrame = val => {
//   switch (val) {
//     case '+':
//       setmarker(marker+.04)
//       break
//     case '-':
//       setmarker(marker-.04)
//       break
//     default:
//       alert('something went wrong switching frames')
//   }
// }
