import axios from 'axios'

export default function(orderId, workIds) {
  axios.post('/mechanic-api/order', {
    orderId,
    workIds
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