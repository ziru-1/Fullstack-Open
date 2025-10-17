import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

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

const { setAnecdotes, createAnecdote, incrementVote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdoteToVote = getState().anecdotes.find((anec) => anec.id === id)
    const updatedAnecdote = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1,
    }
    await anecdoteService.updateVote(id, updatedAnecdote)
    dispatch(incrementVote(id))
  }
}

export default anecdoteSlice.reducer
