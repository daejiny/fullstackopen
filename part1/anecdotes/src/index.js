import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, handler }) => (
  <button onClick={handler}>
    {text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(
    {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    }
  )

  const VoteAdd = () => {
    const newVotes = {
      ...votes,
      [selected]: Number([votes[selected]]) + 1,
    }
    setVotes(newVotes)
  }

  const TopVote = ({ votes }) => Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <Button text='Vote' handler={() => VoteAdd()} />
      <Button text='Next!' handler={() => setSelected(Math.floor(Math.random() * 6))} />
      <p>has {votes[selected]} votes</p>
      <h1>Top Anecdote</h1>
      <p>{props.anecdotes[TopVote({ votes })]}</p>
      <p>has {votes[TopVote({ votes })]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)