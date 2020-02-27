import React from 'react'
import ReactDOM from 'react-dom'
import VideoMachine from './components/VideoMachine'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<VideoMachine />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
