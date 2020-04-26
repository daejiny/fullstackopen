import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

const likeBlog = async blog => {
  const updatedBlog = {
    user: blog.user,
    likes: blog.likes + 1,
    author: blog.author,
    title: blog.title,
    url: blog.url
  }
  const res = await axios.put(`${baseUrl}/${blog.id}`, updatedBlog)

  return res.data
}

const deleteBlog = async blog => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${blog.id}`, config)
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

export default { getAll, setToken, create, likeBlog, deleteBlog }