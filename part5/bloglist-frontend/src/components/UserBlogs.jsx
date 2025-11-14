import React from 'react'
import { useParams } from 'react-router'

const UserBlogs = ({ users }) => {
  const { id } = useParams()
  const user = users.find((user) => user.id === id)

  if (user.blogs.length === 0) {
    return <h3>No blogs found for this user</h3>
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserBlogs
