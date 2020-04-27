import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addAnecdote = async (anecdote) => {
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const addVoteTo = async (anecdote) => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, { ...anecdote, votes: anecdote.votes + 1 })
  return response.data
}

export default { getAll, addAnecdote, addVoteTo }