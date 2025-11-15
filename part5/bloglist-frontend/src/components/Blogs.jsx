import { useSelector } from 'react-redux'
import { Link } from 'react-router'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 2,
  }

  return (
    <div style={blogStyle}>
      <p>
        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
      </p>
    </div>
  )
}

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  )
}

export default Blogs
