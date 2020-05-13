import React, { useEffect, useContext, useRef, useState } from 'react'
import { SessionData } from './data/Context'
import firebase from 'firebase'
import { commentStyle, p3} from './styles.js'

export default function TextPane({ showComment, playBackOn, currentTime }) {
  const comments = useContext(SessionData).comments
  const videoID = useContext(SessionData).video
  const counter = useRef(0)
  const [visible, setVisible] = useState([])
  const prevTime = useRef()
  const [commentRoll, setCommentRoll] = useState([])
  const [matchComments, setMatch] = useState([])
  const items = useRef()

  useEffect(() => {
    let sessions = []
    let commentArrays = []
    if (playBackOn) {
      console.log('getting data')
      firebase.database().ref(`/videos/${videoID}/sessions`).on('value', snapshot => {
        const data = snapshot.val()
        sessions = Object.keys(data)
        sessions.forEach(id => {
          const idRef = firebase.database().ref(`/sessions/${id}/comments`)
          idRef.on('value', (snapshot) => {
            if (snapshot.val()) {
              var i
              for (i = 0; i < snapshot.val().length; i++) {
                const commentToAdd = snapshot.val()[i].text
                const tsToAdd = snapshot.val()[i].ts
                commentArrays.push({text: commentToAdd, ts: tsToAdd})
              }
            }
          })
          console.log('setting comments')
          setCommentRoll(commentArrays)
        })
      })
    }
    else {
      setCommentRoll([])
      setMatch([])
    }
    return () => {
      firebase.database().ref(`/videos/${videoID}/sessions`).off()
      sessions.forEach(id => {
      const idRef = firebase.database().ref(`/sessions/${id}/comments`)
      idRef.off()
    })}
}, [playBackOn, videoID])
  console.log(playBackOn)
  console.log(commentRoll)
  console.log(matchComments)


    useEffect(() => {
      let matchArrays = []
      if (!playBackOn) {
        console.log('setting match')
        setMatch([])
      }
      else {
        console.log("matching")
        console.log(commentRoll)
        for (const comment in commentRoll) {
          console.log(commentRoll[comment])
          if (currentTime + .021 >= commentRoll[comment].ts && currentTime - .021 <= commentRoll[comment].ts) {
            console.log("match!")
            matchArrays.push({time: commentRoll[comment].ts, text: commentRoll[comment].text})
            console.log(matchArrays)
            }
          }
          console.log(matchArrays)
          if (matchArrays.length > 0 && matchComments[matchComments.length - 1]?.text !== matchArrays[0]?.text) {
            const concattor = matchComments.concat(matchArrays)
            setMatch(concattor)
          }
      }
      }, [currentTime, commentRoll])

    useEffect(() => {
      console.log("writing to items")
      console.log(matchComments)
      items.current = matchComments.map((array, i) => {
          return <p key={i}>{array.text} {array.time}</p>
        })
      console.log(items.current)
    }, [matchComments])

  return (
    <>
    <div style={p3}>
    {(playBackOn) &&
      <div style={commentStyle}>
      {items.current}
      </div>
    }
    </div>
    </>
  )
}
