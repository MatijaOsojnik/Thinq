import axios from 'axios'

export default {
    index(userId, file) {
        return axios.post(`users/${userId}/upload`, file)
    },
}