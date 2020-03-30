
export function dataReducer(data, action) {
  const sessionID = Object.keys(data)[0]
  switch (action.type) {
    case 'setID':
      return {...data, videoID: action.id}
    case 'add':
      break
    case 'remove':
      break
    case 'modify':
      break
    default:
      alert('invalid action type')
  }
}
