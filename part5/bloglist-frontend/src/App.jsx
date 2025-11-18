import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route, Routes } from 'react-router'
import { setNotif, resetNotif } from './features/notif/notifSlice'
import { appendBlog, initalizeBlogs } from './features/blog/blogSlice'
import { loginUser, setUser } from './features/user/userSlice'
import usersService from './services/users'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import UserBlogs from './components/UserBlogs'
import BlogDetails from './components/BlogDetails'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])

  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await usersService.getAll()
        const sortedData = data.sort((a, b) => b.blogs.length - a.blogs.length)
        setUsers(sortedData)
      } catch (error) {
        console.error(error)
      }
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    dispatch(initalizeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [dispatch])

  const notifyWith = (message, isError = false) => {
    dispatch(setNotif({ message, isError }))
    setTimeout(() => {
      dispatch(resetNotif())
    }, 5000)
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      dispatch(loginUser(username, password))
      setUsername('')
      setPassword('')
    } catch (error) {
      notifyWith(error.response.data.error, true)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
  }

  const handleAddBlog = async (blogDetails) => {
    try {
      dispatch(appendBlog(blogDetails, user))
      notifyWith(
        `a new blog: ${blogDetails.title} by ${blogDetails.author} added`
      )
    } catch {
      notifyWith('title and url required', true)
    }
  }

  const loginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <form>
          <div>
            <label>
              username:
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              password:
              <input
                type="text"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button onClick={handleLogin}>Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <div>
        <p style={{backgroundColor:'lightgray', padding: '10px' }}>
          <Link to='/'>blogs</Link>&nbsp;
          <Link to='/users'>users</Link>&nbsp;
          {user?.name} has logged in&nbsp;
          <button onClick={handleLogout}>logout</button>
        </p>
      </div>
      <div>
        {!user ? (
          loginForm()
        ) : (
          <div>
            <h2>blogs</h2>
            <Notification />
            <Togglable buttonName="Create new blog">
              <BlogForm handleAddBlog={handleAddBlog} />
            </Togglable>
          </div>
        )}
      </div>

      <Routes>
        <Route
          path="/users"
          element={
            <>
              <div>
                <h2>Users</h2>
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>blogs created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.username}>
                        <td>
                          <Link to={`/users/${user.id}`}>{user.name}</Link>
                        </td>
                        <td>{user.blogs.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          }
        />
        <Route path="/users/:id" element={<UserBlogs users={users} />} />
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
      </Routes>
    </div>
  )
}

export default App
