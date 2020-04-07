import React, { useEffect, useContext, useRef, useState } from 'react'
import { SessionData } from './data/Context'


export default function TextPane({ showComment, playBackOn, time }) {
  const comments = useContext(SessionData).comments
  const counter = useRef(0)
  const [visible, setVisible] = useState([])
  const prevTime = useRef()

  useEffect(() => {
    if (playBackOn && (time < prevTime.current)) {
      setVisible(comments.filter( comment => comment.ts <= time))
      counter.current = visible.length
    }
    if (playBackOn && (time >= comments[counter.current]?.ts)) {
      setVisible([...visible, comments[counter.current]])
      counter.current = counter.current+1
      prevTime.current = time
    }
  }, [time, comments, playBackOn, visible])

  if (playBackOn) {
    return visible.map(comment => <p style={{marginLeft: '5%'}}>[{comment.ts}] {comment.text}</p>)
  }
  return (
    <p style={{marginLeft: '5%'}}>{showComment}</p>
  )
}
