import { useEffect, useState } from 'react'
import { createDiary, getAllDiaries } from './services/diaryService'
import type { DiaryEntry, Visibility, Weather } from './types'

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const data = await getAllDiaries()
        setDiaries(data)
      } catch (error) {
        console.error('Failed to fetch diaries', error)
      }
    }

    fetchDiaries()
  }, [])

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    try {
      const newEntry = await createDiary({
        date,
        visibility: visibility as Visibility,
        weather: weather as Weather,
        comment,
      })

      setDiaries(diaries.concat(newEntry))
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('Something went wrong')
      }

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Add new entry</h2>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          date
          <input
            type='text'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          visibility
          <input
            type='text'
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          />
        </div>

        <div>
          weather
          <input
            type='text'
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
          />
        </div>

        <div>
          comment
          <input
            type='text'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <button type='submit'>add</button>
      </form>
      <h2>Diary entries</h2>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      ))}
    </div>
  )
}

export default App
