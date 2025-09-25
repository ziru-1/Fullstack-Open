import { useState } from 'react'

const Blog = ({ blog, user, handleLikeUpdate, handleDeleteBlog }) => {
  const [isShowDetails, setIsShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 2,
  }

  const handleLikeButtonClick = () => {
    handleLikeUpdate(blog)
  }

  const handleDeleteButtonClick = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this blog?'
    )
    if (!confirmed) return

    handleDeleteBlog(blog.id)
  }

  const toggleShowDetails = () => {
    setIsShowDetails(!isShowDetails)
  }

  return (
    <div style={blogStyle}>
      <p>
        Title: {blog.title}{' '}
        <button onClick={toggleShowDetails}>
          {isShowDetails ? 'hide' : 'view'}
        </button>
      </p>
      {isShowDetails && (
        <>
          <p>Url: {blog.url}</p>
          <p>
            Likes: {blog.likes}{' '}
            <button onClick={handleLikeButtonClick}>like</button>
          </p>
          <p>Author: {blog.author}</p>
          <p>User: {blog.user ? blog.user.name : 'No user'}</p>
          {user.username === blog.user.username && (
            <button onClick={handleDeleteButtonClick}>remove</button>
          )}
        </>
      )}
    </div>
  )
}

export default Blog
