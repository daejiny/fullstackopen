import axios from 'axios'
const baseUrl = '/api/users'

const getAllUsers = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const getUserById = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`)
  return request.data
}

export default { getAllUsers, getUserById }