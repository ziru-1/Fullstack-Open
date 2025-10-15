import { useSelector } from 'react-redux'

const Notification = () => {
  const notifMessage = useSelector(({ notif }) => notif)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: '10px'
  }

  if (notifMessage === '') {
    return null
  }

  return <div style={style}>{notifMessage}</div>
}

export default Notification
