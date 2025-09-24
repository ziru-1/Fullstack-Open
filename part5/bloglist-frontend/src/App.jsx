import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({ message: null });

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const notifyWith = (message, isError = false) => {
    setNotification({ message, isError });
    setTimeout(() => {
      setNotification({ message: null });
    }, 5000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      notifyWith(error.response.data.error, true);
    }
  };

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  };

  const handleAddBlog = async (blogDetails) => {
    try {
      const addedBlog = await blogService.addBlog(blogDetails, user.token);

      setBlogs((prevBlogs) => [...prevBlogs, addedBlog]);
      notifyWith(`a new blog: ${addedBlog.title} by ${addedBlog.author} added`);
    } catch {
      notifyWith('title and url required', true);
    }
  };

  const loginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notification={notification} />
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
    );
  };

  return (
    <div>
      {!user ? (
        loginForm()
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification notification={notification} />
          <p>
            {user.name} has logged in{' '}
            <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonName="Create new blog">
            <BlogForm handleAddBlog={handleAddBlog} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
