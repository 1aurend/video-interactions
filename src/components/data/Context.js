import React, { useReducer, useState } from 'react'
import { dataReducer } from './reducers.js'
import VideoMachine from '../VideoMachine'

export const Markers = React.createContext()
export const UpdateMarkers = React.createContext()
export const Playing = React.createContext()
export const SetPlaying = React.createContext()
export const SessionData = React.createContext()

export default function DataContext() {
  const testSessionID = new Date()
  const initialData = {
    [testSessionID]: {
      videoID: '',
      markers: {}
    }
  }
  const [markers, updateMarkers] = useState([])
  const [playing, setPlaying] = useState(false)
  const [session, updateSession] = useReducer(dataReducer, initialData)

  return (
    <Markers.Provider value={markers}>
      <UpdateMarkers.Provider value={updateMarkers}>
        <Playing.Provider value={playing}>
          <SetPlaying.Provider value={setPlaying}>
            <SessionData.Provider value={updateSession}>
              <VideoMachine session={session} />
            </SessionData.Provider>
          </SetPlaying.Provider>
        </Playing.Provider>
      </UpdateMarkers.Provider>
    </Markers.Provider>
  )
}
