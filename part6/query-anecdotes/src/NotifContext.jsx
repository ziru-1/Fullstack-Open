import { createContext, useReducer } from 'react'

const notifReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIF':
      return action.payload
    case 'CLEAR_NOTIF':
      return ''
    default:
      break
  }
}

const NotifContext = createContext()

export const NotifContextProvider = (props) => {
  const [notif, notifDispatch] = useReducer(notifReducer, '')

  return (
    <NotifContext.Provider value={{ notif, notifDispatch }}>
      {props.children}
    </NotifContext.Provider>
  )
}

export default NotifContext
