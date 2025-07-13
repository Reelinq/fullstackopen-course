import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
	const anecdotes = useSelector(state => {
		return state.anecdotes.filter(anecdote =>
			anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  })

  const dispatch = useDispatch()

	const voteHandler = (anecdote) => {
		dispatch(voteAnecdote(anecdote))
		dispatch(showNotification(`you woted ${anecdote.content}`))
	}

  return (
    <>
			{[...anecdotes]
			.sort((a, b) => b.votes - a.votes)
			.map(anecdote => (
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => voteHandler(anecdote)}>vote</button>
					</div>
				</div>
			))}
    </>
  )
}

export default AnecdoteList