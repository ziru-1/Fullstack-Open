import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { removeNotif, setNotif } from '../reducers/notifReducer'

const Anecdote = ({ anecdote, vote }) => {
  return (
    <>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
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
  
  const vote = (id, content) => {
    dispatch(incrementVote(id))
    dispatch(setNotif(`You voted for ${content}`))
    setTimeout(() => {
      dispatch(removeNotif())
    }, 5000);
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
