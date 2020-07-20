import axios from 'axios'
const urls = {
  tunnel:'http://backend-770c9074.localhost.run',
  local:'http://localhost:3001'
}
const api = new axios.create({
  baseURL:urls.local
})

export default api 