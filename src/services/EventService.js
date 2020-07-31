import axios from 'axios'
import NProgress from 'nprogress'

const apiClient = axios.create({
  baseURL: `http://localhost:3000/api`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkdGcmthTWY5ZXFMQkpiSmlFIiwiaWF0IjoxNTk2MjEzODYyLCJleHAiOjE1OTY0NzMwNjJ9.d_ifm2AvGgdb5PFIBGNzbIt6uhvFScFWDM098Bcx7EU'
  },
  timeout: 60000
})

// apiClient.interceptors.request.use( config => {
//   NProgress.start()
//   return config
// })
//
// apiClient.interceptors.response.use( config => {
//   NProgress.done()
//   return config
// })

export default {
  getEvents(perPage, page) {
    return apiClient.get(`events/get/chunks/${page}/${perPage}`)
  },
  getEvent(id) {
    return apiClient.get(`/events/${id}`)
  },
  postEvent(event) {
    return apiClient.post('/events', event)
  }
}
