const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Unable to get anecdotes from server')
  }

  return response.json()
}

export { getAll }
