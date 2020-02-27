import React from 'react'
import { ProgressBar, Progress } from '@bit/digiaonline.react-foundation.progress-bar'
import { Colors } from '@bit/digiaonline.react-foundation.internal.enums'


export default function Scrubber({ markers }) {
  const markerIcons = markers.map( (marker, i) => {return <div style={{width: '.5%', height: '1em', backgroundColor: 'black', marginLeft: 100*i + 'px', marginTop: '-2px' }}></div>} )
  return (
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', width: '100%', height: '2em', backgroundColor: '#0EBFE9', borderTop: '5px solid white', marginBottom: '2%'}}>
        {markerIcons}
      </div>
  )
}
