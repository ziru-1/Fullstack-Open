import React from 'react'
import { useParams } from 'react-router'

const UserBlogs = ({ blogs }) => {
  const { id } = useParams()
  const userBlogs = blogs.filter((blog) => blog.user.id === id)

  if (userBlogs.length === 0) {
    return <h3>No blogs found for this user</h3>
  }

  return (
    <div>
      <h2>{userBlogs[0].user.username}</h2>
      <h3>added blogs</h3>
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserBlogs
