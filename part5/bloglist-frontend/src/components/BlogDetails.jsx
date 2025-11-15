import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { incrementBlogLike } from '../features/blog/blogSlice'

const BlogDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  )

  const handleLike = () => {
    dispatch(incrementBlogLike(blog))
  }

  if (!blog) return <div>Blog not found</div>

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes <button onClick={handleLike}>like</button>
      </p>
      <p>added by {blog.user.name}</p>
    </div>
  )
}

export default BlogDetails
