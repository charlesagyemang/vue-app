import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:3000/api`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkdGcmthTWY5ZXFMQkpiSmlFIiwiaWF0IjoxNTk2MTUyNjYwLCJleHAiOjE1OTYxODE0NjB9.3kyk0BOVu9ACQK9rMLs9kjT5T-P71AQAdysTyOmJA-k'
  }
})

export default {
  getEvents() {
    return apiClient.get('/events/get/all')
  },
  getEvent(id) {
    return apiClient.get(`/events/${id}`)
  },
  postEvent(event) {
    return apiClient.post('/events', event)
  }
}
