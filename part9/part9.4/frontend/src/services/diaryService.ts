import axios from 'axios'
import type { DiaryEntry, NewDiaryEntry } from '../types'

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaries = async () => {
  try {
    const response = await axios.get<DiaryEntry[]>(baseUrl)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Failed to fetch diaries')
    }
    throw error
  }
}

export const createDiary = async (object: NewDiaryEntry) => {
  try {
    const response = await axios.post<DiaryEntry>(baseUrl, object)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log(error)
      throw new Error(error.response?.data || 'Failed to create diary')
    }
    throw error
  }
}
