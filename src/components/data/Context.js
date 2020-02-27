import React, { useReducer } from 'react'
import { dataReducer } from './reducers.js'
import VideoMachine from '../VideoMachine'

const Data = React.createContext()
const Dispatch = React.createContext()

export default function DataContext() {
  const initialData = {
    videoID: '',
    IOs: {}
  }
  const [data, dispatch] = useReducer(dataReducer, initialData)

  return (
    <Data.Provider value={data}>
      <Dispatch.Provider value={dispatch}>
        <VideoMachine />
      </Dispatch.Provider>
    </Data.Provider>
  )
}
