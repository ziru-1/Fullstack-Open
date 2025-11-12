import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { setNotif, resetNotif } from './features/notif/notifSlice'
import {
  appendBlog,
  editBlog,
  initalizeBlogs,
  removeBlog,
} from './features/blog/blogSlice'
import { loginUser, setUser } from './features/user/userSlice'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const userBlogCount = Object.values(
    blogs.reduce((acc, item) => {
      const username = item.user.username
      if (!acc[username]) {
        acc[username] = { username, count: 0 }
      }
      acc[username].count += 1
      return acc
    }, {})
  ).sort((a, b) => b.count - a.count)

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
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
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

  const handleLikeUpdate = async (blog) => {
    dispatch(editBlog(blog))
  }

  const handleDeleteBlog = async (id, deletedBlogTitle) => {
    dispatch(removeBlog(id, user))
    notifyWith(`${deletedBlogTitle} has been deleted`)
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
        {!user ? (
          loginForm()
        ) : (
          <div>
            <h2>blogs</h2>
            <Notification />
            <p>
              {user.name} has logged in{' '}
              <button onClick={handleLogout}>logout</button>
            </p>
            <Togglable buttonName="Create new blog">
              <BlogForm handleAddBlog={handleAddBlog} />
            </Togglable>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                handleLikeUpdate={handleLikeUpdate}
                handleDeleteBlog={handleDeleteBlog}
              />
            ))}
          </div>
        )}
      </div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {
            userBlogCount.map((user) => (
              <tr key={user.username}>
                <td>{user.username}</td>
                <td>{user.count}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default App
