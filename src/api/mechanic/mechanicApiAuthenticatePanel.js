import axios from 'axios'

export default function(login, password, postNumber) {
  axios.post('/mechanic-api/authenticate-panel', {
    login,
    password,
    postNumber
  })
    .then((response) => {
      console.log(response.data)
      console.log(response.status)
      console.log(response.headers)
    })
    .catch((error) => {
      console.log(error)
    })
}