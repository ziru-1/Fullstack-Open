import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    incrementVote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find((anec) => anec.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      }
      return state.map((anec) => (anec.id === id ? changedAnecdote : anec))
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { createAnecdote, incrementVote, setAnecdotes } =
  anecdoteSlice.actions
export default anecdoteSlice.reducer
