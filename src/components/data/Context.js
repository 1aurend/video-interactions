import React, { useReducer, useState, useEffect } from 'react'
import { dataReducer } from './reducers.js'
import StartMenu from '../Start'
import Firebase from 'firebase'
import firebaseConfig from './config'


export const Playing = React.createContext()
export const SetPlaying = React.createContext()
export const updateSessionData = React.createContext()
export const SessionData = React.createContext()


export default function DataContext() {
  const initialData =
    {
      sessionID: '',
      video: '',
      username: 'anonymous',
      comments: [],
      segments: []
    }
  const [playing, setPlaying] = useState(false)
  const [session, updateSession] = useReducer(dataReducer, initialData)

  useEffect(() => {
    Firebase.initializeApp(firebaseConfig)
  }, [])

  return (
    <Playing.Provider value={playing}>
      <SetPlaying.Provider value={setPlaying}>
        <updateSessionData.Provider value={updateSession}>
          <SessionData.Provider value={session}>
            <StartMenu />
          </SessionData.Provider>
        </updateSessionData.Provider>
      </SetPlaying.Provider>
    </Playing.Provider>
  )
}
