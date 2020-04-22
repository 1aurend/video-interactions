import React, { useEffect, useContext, useRef, useState } from 'react'
import { SessionData } from './data/Context'
import firebase from 'firebase'


export default function TextPane({ showComment, playBackOn, time }) {
  const comments = useContext(SessionData).comments
  const videoID = useContext(SessionData).video
  const counter = useRef(0)
  const [visible, setVisible] = useState([])
  const prevTime = useRef()
  const [commentRoll, setCommentRoll] = useState([])

  useEffect(() => {
  let sessions = []
  let commentArrays = []
  if (playBackOn) {
    firebase.database().ref(`/videos/${videoID}/sessions`).on('value', snapshot => {
      const data = snapshot.val()
      sessions = Object.keys(data)
      sessions.forEach(id => {
        const idRef = firebase.database().ref(`/sessions/${id}/comments`)
        idRef.on('value', (snapshot) => {
          console.log(snapshot.val())
          commentArrays.push(snapshot.val())
          if (snapshot.val()) {
            var i
            for (i = 0; i < snapshot.val().length; i++) {
              console.log(snapshot.val()[i].text)
              const commentToAdd = snapshot.val()[i].text
              const tsToAdd = snapshot.val()[i].ts
              console.log(commentToAdd)
              setCommentRoll(commentRoll => [...commentRoll, {text: commentToAdd, ts: tsToAdd}])
            }
          }
        })
        return commentArrays
      })
    })
  }
  return () => {
    firebase.database().ref(`/videos/${videoID}/sessions`).off()
    sessions.forEach(id => {
    const idRef = firebase.database().ref(`/sessions/${id}/comments`)
    idRef.off()
  })}
}, [playBackOn, videoID])
  console.log(commentRoll)

  const items = commentRoll.map((array, i) => {
      return <p key={i}>{array.text} {array.ts}</p>
    })
  console.log(items)
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

//   if (playBackOn) {
//       return commentRoll.map(comment => <p style={{marginLeft: '5%'}}>[{comment.ts}] {comment.text}</p>)
//     }
//     return (
//       <p style={{marginLeft: '5%'}}>{showComment}</p>
//     )
// }
  return (
    <>
    {(playBackOn) &&
      <div>
      {items}
      </div>
    }
    </>
  )
}
