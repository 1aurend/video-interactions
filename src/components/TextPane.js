import React, { useEffect, useContext, useRef, useState } from 'react'
import { SessionData } from './data/Context'
import firebase from 'firebase'


export default function TextPane({ showComment, playBackOn, time }) {
  const comments = useContext(SessionData).comments
  const videoID = useContext(SessionData).video
  const counter = useRef(0)
  const [visible, setVisible] = useState([])
  const prevTime = useRef()

  useEffect(() => {
    let sessions = []
    if (playBackOn) {
      firebase.database().ref(`/videos/${videoID}/sessions`).once('value').then(snapshot => {
        const data = snapshot.val()
        sessions = Object.keys(data)
        sessions.forEach(id => {
          const idRef = firebase.database().ref(`/sessions/${id}/comments`)
          idRef.on('value', (snapshot) => {
            console.log(snapshot.val())
          })
        })
      })
    }
    return () => {sessions.forEach(id => {
      const idRef = firebase.database().ref(`/sessions/${id}/comments`)
      idRef.off()
    })}
  }, [playBackOn, videoID])

  // useEffect(() => {
  //   if (playBackOn && (time < prevTime.current)) {
  //     const nowVisible = comments.filter(comment => comment.ts <= time)
  //     setVisible(nowVisible)
  //     counter.current = nowVisible.length
  //   }
  //   if (playBackOn && (time >= comments[counter.current]?.ts)) {
  //     setVisible(visible => visible.concat(comments[counter.current]))
  //     counter.current = counter.current+1
  //     prevTime.current = time
  //   }
  // }, [time, comments, playBackOn, setVisible])

  if (playBackOn) {
    return visible.map(comment => <p style={{marginLeft: '5%'}}>[{comment.ts}] {comment.text}</p>)
  }
  return (
    <p style={{marginLeft: '5%'}}>{showComment}</p>
  )
}
