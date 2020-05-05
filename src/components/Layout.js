import React from 'react'
import styled from 'styled-components'
import { titleStyle } from './styles.js'


export default function Layout({ children }) {
  return (
    <div style={{height: '100%'}}>
      <h2 style={titleStyle}>Video Interaction Machine Prototype</h2>
      {children}
    </div>
  )
}
