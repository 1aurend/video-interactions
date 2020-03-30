import React, { useEffect } from 'react'


export default function TextPane({ showComment, playBackOn }) {
  if (playBackOn) {

  }
  return (
    <p style={{marginLeft: '5%'}}>{showComment}</p>
  )
}
