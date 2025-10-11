import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, vote }) => {
  return (
    <>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.sort((a, b) => b.votes - a.votes)
  )

  const dispatch = useDispatch()
  const vote = (id) => {
    dispatch(incrementVote(id))
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} vote={vote} />
      ))}
    </div>
  )
}

export default AnecdoteList
