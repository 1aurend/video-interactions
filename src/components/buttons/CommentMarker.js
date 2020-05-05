import React, { useState } from 'react'
import { buttonStyle, inputStyle } from '../styles.js'

export default function CommentMarker(props) {
  const { player, setMarker } = props
  const [inputOpen, setInputOpen] = useState(false)
  const [commentText, setCommentText] = useState()
  const buttonText = inputOpen ? 'undo comment' : 'add comment'

  const openInput = () => {
    player.current.getCurrentTime().then( secs => {
      player.current.pause()
      setMarker({type: 'set', secs: secs})
    })
    setInputOpen(true)
  }

  const saveComment = () => {
    setMarker({type: 'comment', text: commentText})
    setInputOpen(false)
  }

  return (
    <>
      <button style={buttonStyle} onClick={openInput}>{buttonText}</button>
      {inputOpen &&
        <>
          <input style={inputStyle} type='text' onChange={(e) => setCommentText(e.target.value)}></input>
          <button style={buttonStyle} onClick={saveComment}>save</button>
        </>
      }
    </>
  )
}
