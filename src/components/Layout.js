import React from 'react'
import styled from 'styled-components'


export default function Layout({ children }) {
  return (
    <div style={{height: '100%'}}>
      <h2>Video Interaction Machine Prototype</h2>
      {children}
    </div>
  )
}
