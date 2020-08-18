import axios from 'axios'
const ipconfig = localStorage.getItem('ipconfig')
const urls = {
  // tunnel:'http://backend-770c9074.localhost.run',
  // local:'http://localhost:3002',
  ip: ipconfig
}
const api = new axios.create({
  baseURL:urls.ip
})

export default api 