import { useEffect, useState } from 'react'
import { createDiary, getAllDiaries } from './services/diaryService'
import type { DiaryEntry } from './types'
import { Visibility, Weather } from './types'

type VisibilityOptions = {
  label: string
  value: Visibility
}

type WeatherOptions = {
  label: string
  value: Weather
}

const visibilityOptions: VisibilityOptions[] = [
  { label: 'great', value: Visibility.Great },
  { label: 'good', value: Visibility.Good },
  { label: 'ok', value: Visibility.Ok },
  { label: 'poor', value: Visibility.Poor },
]

const weatherOptions: WeatherOptions[] = [
  { label: 'sunny', value: Weather.Sunny },
  { label: 'rainy', value: Weather.Rainy },
  { label: 'cloudy', value: Weather.Cloudy },
  { label: 'stormy', value: Weather.Stormy },
  { label: 'windy', value: Weather.Windy },
]

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState<Visibility | ''>('')
  const [weather, setWeather] = useState<Weather | ''>('')
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

    if (!visibility || !weather) {
      setErrorMessage('Please select visibility and weather')
      return
    }

    try {
      const newEntry = await createDiary({
        date,
        visibility: visibility,
        weather: weather,
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
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          visibility
          {visibilityOptions.map((opt) => (
            <label key={opt.value}>
              <input
                type='radio'
                name='visibility'
                value={opt.value}
                checked={visibility === opt.value}
                onChange={() => setVisibility(opt.value)}
              />
              {opt.label}
            </label>
          ))}
        </div>

        <div>
          weather
          {weatherOptions.map((opt) => (
            <label key={opt.value}>
              <input
                type='radio'
                name='weather'
                value={opt.value}
                checked={weather === opt.value}
                onChange={() => setWeather(opt.value)}
              />
              {opt.label}
            </label>
          ))}
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
