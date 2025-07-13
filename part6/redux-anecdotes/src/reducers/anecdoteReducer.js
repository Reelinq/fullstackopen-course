import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
			state.push(action.payload)
		},
    voteSelected(state, action) {
      const updated = action.payload
      return state.map(a =>
        a.id !== updated.id ? a : updated
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
	}
})

export const { appendAnecdote, voteSelected, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = content => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.vote(content)
    dispatch(voteSelected(votedAnecdote))
  }
}

export default anecdoteSlice.reducer