import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const dataToSend = {
  email: 'test@gmail.com',
  password: 'password',
}

export default {
  token(){
    apiClient.post('/users/login', dataToSend)
    .then((response) => {
      return response.data.token
    }).catch((error) => {
      // console.log(error.response);
      return false
    })
  }
}
