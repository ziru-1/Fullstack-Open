import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { addComment, incrementBlogLike } from '../features/blog/blogSlice'
import { useState } from 'react'
import blogService from '../services/blogs'

const BlogDetails = () => {
  const [comment, setComment] = useState('')

  const { id } = useParams()
  const dispatch = useDispatch()
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  )

  const handleLike = () => {
    dispatch(incrementBlogLike(blog))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (comment.trim() === '') return
    blogService.addComment(id, comment)
    dispatch(addComment({ id, comment }))
    setComment('')
  }

  if (!blog) return <div>Blog not found</div>

  return (
    <div>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes <button onClick={handleLike}>like</button>
      </p>
      <p>added by {blog.user.name}</p>

      <h2>comments</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={`${comment}-${index}`}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogDetails
