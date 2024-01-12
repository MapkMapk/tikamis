import axios from 'axios'

export default function(orderId, workId) {
  axios.delete('/mechanic-api/order', {
    orderId,
    workId
  })
    .then((response) => {
    })
    .catch((error) => {
      console.log(error)
    })
}