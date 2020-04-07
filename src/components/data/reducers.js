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
      return {...data, username: action.name}
    case 'addComment':
      const newComments = data.comments.concat(action.comment)
      Firebase.database().ref(`sessions/${data.sessionID}/comments`).set(newComments)
      return {...data, comments: newComments}
    case 'setSessionID':
      Firebase.database().ref(`sessions/${action.id}`).set({username: data.username})
      return {...data, sessionID: action.id}
    default:
      alert('invalid action type')
  }
}
