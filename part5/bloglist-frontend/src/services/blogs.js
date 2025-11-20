import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const addBlog = async (blogDetails, token) => {
  const response = await axios.post(baseUrl, blogDetails, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const addComment = async (blogId, comment) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, {
    comment,
  })
  console.log('response', response)
  return response.data
}

const updateBlogLike = async (id, currentLikes) => {
  const response = await axios.put(`${baseUrl}/${id}`, {
    likes: currentLikes + 1,
  })
  return response.data
}

const deleteBlog = async (id, token) => {
  await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export default { getAll, addBlog, addComment, updateBlogLike, deleteBlog }
