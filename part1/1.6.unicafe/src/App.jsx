import { useState } from 'react'

const Header = ({ content }) => <><h1>{content}</h1></>

const Button = ({ onClick, text }) => <button onClick={onClick} >{text}</button>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <div id='feedback'>
        <Header content='give feedback' />
        <Button onClick={increaseGood} text='good' />
        <Button onClick={increaseNeutral} text='neutral' />
        <Button onClick={increaseBad} text='bad' />
      </div>
      <div id='statictics'>
        <Header content='statistics' />
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
      </div>
    </div>
  )
}

export default App