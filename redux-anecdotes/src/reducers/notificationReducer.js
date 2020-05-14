const notificationReducer = (state, action) => {
  switch(action.type){
    case 'SET_NOTIFICATION': {
      return ({text: action.text, id: action.id})
    }
    case 'CLEAR_NOTIFICATION': {
      if (state.id !== action.id){
        return state
      } else {
        return {id: state.id}
      }

    }
    default:
      return null
  }
}

const showNotification = (id, text) => {
  return {
    type: 'SET_NOTIFICATION',
    id,
    text
  }
}

const hideNotification = (id) => {
  return {
    type: 'CLEAR_NOTIFICATION',
    id
  }
}

let nextNotificationId = 0
export const setNotification = ( text, seconds) => {
  const id = nextNotificationId++
  return dispatch => {
    dispatch(showNotification(id, text))
    setTimeout(()=>{
      dispatch(hideNotification(id))
    }, seconds * 1000)
  }
}


export default notificationReducer
