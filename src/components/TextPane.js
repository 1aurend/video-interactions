import React, { useEffect, useContext, useRef, useState } from 'react'
import { SessionData } from './data/Context'
import firebase from 'firebase'
import { commentStyle } from './styles.js'

export default function TextPane({ showComment, playBackOn, currentTime }) {
  const comments = useContext(SessionData).comments
  const videoID = useContext(SessionData).video
  const counter = useRef(0)
  const [visible, setVisible] = useState([])
  const prevTime = useRef()
  const [commentRoll, setCommentRoll] = useState([])
  const [matchComments, setMatch] = useState([])

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

  const items = matchComments.map((array, i) => {
      return <p key={i}>{array.text} {array.time}</p>
    })
  console.log(items)


    useEffect(() => {
      for (const comment in commentRoll) {
        console.log(commentRoll[comment].ts)
        console.log(commentRoll[comment].text)
        if (currentTime + .1 >= commentRoll[comment].ts && currentTime - .1 <= commentRoll[comment].ts) {
          if (matchComments.length > 0) {
            console.log("first if")
            if (commentRoll[comment].text === matchComments[matchComments.length - 1].text) {
              break
            }
          }
          console.log("match!")
          setMatch(matchComments => [...matchComments, {time: commentRoll[comment].ts, text: commentRoll[comment].text}])
          }
        }
      }, [currentTime, commentRoll])


  return (
    <>
    {(playBackOn) &&
      <div style={commentStyle}>
      {items}
      </div>
    }
    </>
  )
}
