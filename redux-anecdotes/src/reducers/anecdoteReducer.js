import anecdoteService from '../services/anecdoteService'

const anecdoteReducer = (state = [], action) => {
  switch(action.type){
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE': {
      const id = action.data.id
      const anecdoteToVote = state.find(a=>a.id === id)
      const changedAnecdote = {
        ...anecdoteToVote, votes: anecdoteToVote.votes + 1
      }
      return state.map(a=>
        a.id !== id ? a : changedAnecdote
      )
    }
    default:
      return state
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(
      {
        type: 'INIT_ANECDOTES',
        data: anecdotes
      }
    )
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.voteOn(anecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const createAnecdote = (content) => {

  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(
      {
        type: 'NEW_ANECDOTE',
        data: newAnecdote
      }
    )
  }
}

export default anecdoteReducer
