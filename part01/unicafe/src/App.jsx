import { useState } from 'react'

const Header = ({ header }) => <h1>{header}</h1>

const Button = ({ onClick, text }) => <button onClick={onClick} >{text}</button>

const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({ header, good, bad, neutral }) => {

  const all = good + bad + neutral

  if (all === 0) {
    return (
      <div id='statistics'>
        <Header header={header} />
        <p>no feedback given</p>
      </div>
    )
  }
  return (
    <div id='statistics'>
        <Header header={header} />
        <table>
          <tbody>
            <StatisticLine text='good' value={good} />
            <StatisticLine text='neutral' value={neutral} />
            <StatisticLine text='bad' value={bad} />
            <StatisticLine text='all' value={all} />
            <StatisticLine text='average' value={(good + bad * -1) / all} />
            <StatisticLine text='positive' value={good * 100 / all + ' %'} />
          </tbody>
        </table>
      </div>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <>
      <div id='feedback'>
        <Header header='give feedback' />
        <Button onClick={increaseGood} text='good' />
        <Button onClick={increaseNeutral} text='neutral' />
        <Button onClick={increaseBad} text='bad' />
      </div>
      <Statistics header='statistics' good={good} bad={bad} neutral={neutral} />
    </>
  )
}

export default App