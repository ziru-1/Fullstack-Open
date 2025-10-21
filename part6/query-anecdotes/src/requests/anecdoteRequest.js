const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Unable to get anecdotes from server')
  }

  return response.json()
}

const createAnecdote = async (newAnecdote) => {
  console.log(newAnecdote)
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAnecdote)
  }
 
  const response = await fetch(baseUrl, options)
 
  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }
 
  return await response.json()
}

export { getAll, createAnecdote }
