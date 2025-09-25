import { useState } from 'react'

const BlogForm = ({ handleAddBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogFormSubmit = (e) => {
    e.preventDefault()

    handleAddBlog({ title, author, url })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form>
        <div>
          <label>
            title:
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            author:
            <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit" onClick={handleBlogFormSubmit}>
          Add blog
        </button>
      </form>
    </div>
  )
}

export default BlogForm
