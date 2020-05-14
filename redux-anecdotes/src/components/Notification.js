import React from 'react'
import { connect } from 'react-redux'
const Notification = (props) => {

  if (props.notification !== null){
    const message = props.notification.text
    if (message !== undefined){
      const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
      }
      return (
        <div style={style}>
          {message}
        </div>
      )
    } else {
      return null
    }
  } else {
    return null
  }
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    notification: state.notification
  }
}


export default connect(mapStateToProps)(Notification)
