import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotif } from '../reducers/notifReducer'

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
    dispatch(voteAnecdote(id))
    dispatch(setNotif(`Voted for ${content}`, 5))
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
