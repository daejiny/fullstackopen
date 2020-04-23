import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ sentiment, setSentiment }) => (
  <button onClick={setSentiment}>
    {sentiment}
  </button>
)

const Statistic = ({ statisticType, statisticValue }) => (
  <tr>
    <td>{statisticType}</td>
    <td>{statisticValue}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const getTotal = () => good + neutral + bad
  const getAverage = () => (good - bad) / getTotal()
  const getPositive = () => (good) / getTotal()
  if (!getTotal()) return <p>nothing to show</p>
  return (
    <table>
      <tbody>
      <Statistic statisticType="Good" statisticValue={good} />
      <Statistic statisticType="Neutral" statisticValue={neutral} />
      <Statistic statisticType="Bad" statisticValue={bad} />
      <Statistic statisticType="All" statisticValue={getTotal()} />
      <Statistic statisticType="Average" statisticValue={getAverage()} />
      <Statistic statisticType="Positive" statisticValue={getPositive()*100 + '%'} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button sentiment="Good" setSentiment={handleGood} />
      <Button sentiment="Neutral" setSentiment={handleNeutral} />
      <Button sentiment="Bad" setSentiment={handleBad} />
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)