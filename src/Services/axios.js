import axios from 'axios'

const api = new axios.create({
  baseURL:'http://localhost:3001'
})

export default api 