import { useEffect, useState } from 'react'
import { getAllDiaries } from './services/diaryService'
import type { DiaryEntry } from './types'

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

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

  return (
    <div>
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
