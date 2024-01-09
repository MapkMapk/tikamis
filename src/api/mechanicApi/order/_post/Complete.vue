<script>
import axios from 'axios'
export default function(odometer) {
  axios.post('/mechanic-api/order/complete', {
    odometer
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