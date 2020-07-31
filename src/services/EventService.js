import axios from 'axios'
import NProgress from 'nprogress'

const apiClient = axios.create({
  baseURL: `http://localhost:3000/api`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkdGcmthTWY5ZXFMQkpiSmlFIiwiaWF0IjoxNTk2MTgxODMxLCJleHAiOjE1OTYyMTA2MzF9.YszV3Bke7n_Af7ojdhTONIW5s2fn6j2u1bvH60P2Pls'
  }
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
