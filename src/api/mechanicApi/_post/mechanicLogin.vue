<script>
import axios from 'axios'
export default function(mechanicId) {
  axios.post('/mechanic-api/mechanic-login', {
    mechanicId
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