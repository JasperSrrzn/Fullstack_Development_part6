import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteList = (props) => {

  const anecdotesToShow = () => {
    return (
      props.anecdotes
       .filter(a => a.content.toLowerCase().includes(props.filter.toLowerCase()))
       .sort((x,y)=>y.votes - x.votes)
    )
  }


  const vote = async (anecdote) => {
    await props.voteAnecdote(anecdote)
    props.setNotification(`you voted '${anecdote.content}'`,5)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotesToShow().map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const ConnectedAnecdoteList = connect(mapStateToProps, {voteAnecdote, setNotification})(AnecdoteList)
export default ConnectedAnecdoteList
