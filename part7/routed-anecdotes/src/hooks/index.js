import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const handleFieldReset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    handleFieldReset
  }
}

export const useAnotherHook = () => {
  // ...
}