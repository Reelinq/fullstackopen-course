import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, voteAnecdote } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useReducer } from 'react'
import NotificationContext from './components/NotificationContext'
import { setNotification } from './notificationHelper'

const App = () => {
	const queryClient = useQueryClient()

	const notificationReducer = (state, action) => {
		switch (action.type) {
			case "SET_NOTIFICATION":
				return action.payload
			case "CLEAR_NOTIFICATION":
				return state = ''
			default:
				return state
		}
	}
	const [notification, dispatch] = useReducer(notificationReducer, '')

	const voteAnecdoteMutation = useMutation({
		mutationFn: voteAnecdote,
		onSuccess: (votedAnecdote) => {
			const anecdotes = queryClient.getQueryData(['anecdotes'])
			queryClient.setQueryData(['anecdotes'],
				anecdotes.map(a => a.id === votedAnecdote.id ? votedAnecdote : a)
			)
		}
	})

	const handleVote = (anecdote) => {
		voteAnecdoteMutation.mutate({
			...anecdote,
			votes: anecdote.votes + 1
		})
		setNotification(dispatch, `anecdote '${anecdote.content}' voted`)
	}

	const result = useQuery({
		queryKey: ['anecdotes'],
		queryFn: getAnecdotes
	})

	if (result.isLoading) {
		return <div>loading data...</div>
	}

	if (result.isError) {
		return <span>anecdote service not available due to problems in server</span>
	}

	const anecdotes = result.data

	return (
		<div>
			<NotificationContext.Provider value={[notification, dispatch]}>
				<h3>Anecdote app</h3>

				<Notification />
				<AnecdoteForm />

				{anecdotes.map(anecdote =>
					<div key={anecdote.id}>
						<div>
							{anecdote.content}
						</div>
						<div>
							has {anecdote.votes}
							<button onClick={() => handleVote(anecdote)}>vote</button>
						</div>
					</div>
				)}
			</NotificationContext.Provider>
		</div>
	)
}

export default App
