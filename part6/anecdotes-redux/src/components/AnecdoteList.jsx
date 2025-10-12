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
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter)
    )
  )

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  const dispatch = useDispatch()
  const vote = (id) => {
    dispatch(incrementVote(id))
  }

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} vote={vote} />
      ))}
    </div>
  )
}

export default AnecdoteList
