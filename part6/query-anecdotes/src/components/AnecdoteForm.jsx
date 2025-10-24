import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests/anecdoteRequest'
import { useContext } from 'react'
import NotifContext from '../NotifContext'

const AnecdoteForm = () => {
  const { notifDispatch } = useContext(NotifContext)
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (createdAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(createdAnecdote))
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    if (content.length < 5) {
      notifDispatch({
        type: 'SET_NOTIF',
        payload: 'too short anecdote, must have length 5 or more',
      })
      setTimeout(() => {
        notifDispatch({ type: 'CLEAR_NOTIF' })
      }, 5000)

      return
    }

    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    notifDispatch({ type: 'SET_NOTIF', payload: `${content} has been added` })
    setTimeout(() => {
      notifDispatch({ type: 'CLEAR_NOTIF' })
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
