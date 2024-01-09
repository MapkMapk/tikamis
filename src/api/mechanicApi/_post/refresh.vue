<script>
import axios from 'axios'
export default function() {
  axios.post('/mechanic-api/refresh')
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