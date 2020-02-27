import React from 'react'
import styled from 'styled-components'


export default function Layout({ children }) {
  return (
    <div style={{height: '100%'}}>
      <h2>Prototype of Video Marker Machine</h2>
      {children}
    </div>
  )
}
