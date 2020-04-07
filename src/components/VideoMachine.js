import React, { useState, useReducer, useEffect, useContext } from 'react'
import VimeoPlayer from './Vimeo'
import Still from './Still'
import Layout from './Layout'
import { updateSessionData, SessionData } from './data/Context'
import TextPane from './TextPane'


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
    return {ts: action.secs}
  case 'comment':
    return {...marker, text: action.text}
  case 'fwdFrame':
    return {...marker, ts: marker.ts+.04}
  case 'bwdFrame':
    return {...marker, ts: marker.ts-.04}
  case 'clear':
    return null
  default:
    alert('failed to set marker; try again')
  }
}

export default function VideoMachine() {
  const [thisMarker, setMarker] = useReducer(markerReducer, null)
  const updateSession = useContext(updateSessionData)
  const markers = useContext(SessionData).comments
  const [showComment, setShowComment] = useState('')
  const [time, setTime] = useState(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [playBackComments, setPlayBackComments] = useState(false)
  // const [currentSegment, setCurrentSegment] = useReducer(segmentReducer, {in: '', out: '', angle: 'A'})
  const buttonText = playBackComments ? 'turn off comment feed' : 'enable comment feed'

  useEffect(() => {
    if (thisMarker?.text) {
      updateSession({type: 'addComment', comment: thisMarker})
      setMarker({type: 'clear'})
    }
  }, [thisMarker, updateSession])

  const onClickMarker = (index) => {
    setShowComment(`[${markers[index].ts}] ${markers[index].text}`)
    setTime(markers[index].ts)
  }

  return (
    <Layout>
      <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'left'}}>
        <VimeoPlayer setMarker={setMarker} marker={thisMarker} markers={markers} setShowComment={onClickMarker} time={time} setCurrentTime={setCurrentTime} currentTime={currentTime}/>
        <button style={{height: '10px', marginLeft: '5%'}} onClick={() => setPlayBackComments(!playBackComments)}>{buttonText}</button>
        <div>
          <TextPane showComment={showComment} playBackComments={playBackComments} />
        </div>
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
