import axios from 'axios'

export default {
    index() {
        return axios.get('users')
    },
    show(userId) {
        return axios.get(`users/${userId}`)
    },
    put(user) {
        return axios.put(`users/${user.id}`, user)
    },
    changeAvatar(user, file) {
        return axios.put(`users/${user.id}`, file)
    }
}