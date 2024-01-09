<script>
import axios from 'axios'
export default function(orderId) {
  axios.post('/mechanic-api/order/cancel', {
    orderId
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
</script>