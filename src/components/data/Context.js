import React, { useReducer, useState } from 'react'
import { dataReducer } from './reducers.js'
import VideoMachine from '../VideoMachine'

export const Markers = React.createContext()
export const UpdateMarkers = React.createContext()
export const Playing = React.createContext()
export const SetPlaying = React.createContext()

export default function DataContext() {
  const initialData = {
    videoID: '',
    IOs: {}
  }
  const [markers, updateMarkers] = useState([])
  const [playing, setPlaying] = useState(false)

  return (
    <Markers.Provider value={markers}>
      <UpdateMarkers.Provider value={updateMarkers}>
        <Playing.Provider value={playing}>
          <SetPlaying.Provider value={setPlaying}>
            <VideoMachine />
          </SetPlaying.Provider>
        </Playing.Provider>
      </UpdateMarkers.Provider>
    </Markers.Provider>
  )
}
