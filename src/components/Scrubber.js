import React from 'react'

const calculateMarkerPosition = (ts, duration, index) => {
  // console.log(ts)
  // console.log(duration)
  // console.log(+(ts/duration).toFixed(2))
  const percent = (+(ts/duration).toFixed(2))*100
  // console.log(percent)
  const left = percent-((index+1)*.5) + '%'
  // console.log(left)
  return left
}

export default function Scrubber({ markers, duration, setShowComment }) {
  const markerIcons = markers.map( (marker, i) => {
    return <div
              key={i}
              onClick={() => setShowComment(i)}
              style={{
                width: '5px',
                height: '1em',
                backgroundColor: 'black',
                left: calculateMarkerPosition(marker.ts, duration, i),
                marginTop: '-2px',
                position: 'relative'
                }}>
            </div>
          })
  return (
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', width: '100%', height: '2em', backgroundColor: '#0EBFE9', borderTop: '5px solid white', marginBottom: '2%'}}>
        {markerIcons}
      </div>
  )
}
