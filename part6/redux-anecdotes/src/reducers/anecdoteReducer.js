import anecdotesService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => Math.floor((100000 * Math.random()))

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const anecdoteToUpdate = state.find(anecdote => anecdote.id === action.data.id)
      const updatedAnecdote = { ...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1 }
      return state.map(anecdote => anecdote.id === action.data.id ? updatedAnecdote : anecdote)
    case 'ADD':
      const { content, id, votes } = action.data
      const anecdoteToAdd = { content, id, votes }
      return state.concat(anecdoteToAdd)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const newAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdotesService.addAnecdote(asObject(content))
    dispatch({
      type: 'ADD',
      data: anecdote
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    await anecdotesService.addVoteTo(anecdote)
    dispatch({
      type: 'VOTE',
      data: { id: anecdote.id }
    })
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer