import Firebase from 'firebase'


export function dataReducer(data, action) {
  switch (action.type) {
    case 'setVideoID':
      Firebase.database().ref(`videos/${action.id}`).once('value').then(function(snapshot) {
        if (snapshot.exists()) {
          const updates = {
            [`videos/${action.id}/sessions/${data.sessionID}`]: true,
            [`sessions/${data.sessionID}/video`]: action.id
          }
          Firebase.database().ref().update(updates)
          return
        }
        const updates = {
          [`videos/${action.id}`]: {sessions: {[data.sessionID]: true}},
          [`sessions/${data.sessionID}/video`]: action.id
        }
        Firebase.database().ref().update(updates)
      })
      return {...data, video: action.id}
    case 'setUsername':
      Firebase.database().ref(`users/${action.name}`).once('value').then(function(snapshot) {
        if (snapshot.exists()) {
          const updates = {
            [`users/${action.name}/sessions/${data.sessionID}`]: true,
            [`sessions/${data.sessionID}/username`]: action.name
          }
          Firebase.database().ref().update(updates)
          return
        }
        const updates = {
          [`users/${action.name}`]: {sessions: {[data.sessionID]: true}},
          [`sessions/${data.sessionID}/username`]: action.name
        }
        Firebase.database().ref().update(updates)
      })
      return {...data, username: action.name}
    case 'addComment':
      const newCommentIndex = data.comments.length
      Firebase.database().ref(`sessions/${data.sessionID}/comments/${newCommentIndex}`).set(action.comment)
      return {...data, comments: data.comments.concat(action.comment)}
    case 'setSessionID':
      const sessionID = Firebase.database().ref('sessions').push().key
      Firebase.database().ref(`sessions/${sessionID}`).set(true)
      return {...data, sessionID: sessionID}
    default:
      alert('invalid action type')
  }
}
