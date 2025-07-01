import { useState } from 'react'

const Header = ({ content }) => <h1>{content}</h1>
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0)) 
  const [selected, setSelected] = useState(0)

  const maxIndex = votes.indexOf(Math.max.apply(null, votes))

  const generateAnecdote = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  const voteAnecdote = () => {
    const newVotes = votes.concat()
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  return (
    <>
      <div id='dailyAnecdote'>
        <Header content='Anecdote of the day' />
        {anecdotes[selected]}
        <p>has {votes[selected]} votes</p>
        <br />
        <Button onClick={voteAnecdote} text='vote' />
        <Button onClick={generateAnecdote} text='next anecdote' />
      </div>
      <div id='mostVotedAnecdote'>
        <Header content='Anecdote with most votes' />
        {anecdotes[maxIndex]}
        <p>has {votes[maxIndex]} votes</p>
      </div>
    </>
  )
}

export default App