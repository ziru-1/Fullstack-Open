import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addBlog = async (blogDetails, token) => {
  const response = await axios.post(baseUrl, blogDetails, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export default { getAll, addBlog }