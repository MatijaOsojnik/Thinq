import axios from '@/services/axios'

export default {
    index() {
        return axios.get('users')
    },
    show(userId) {
        return axios.get(`users/${userId}`)
    },
    put(userId, data) {
        return axios.put(`users/${userId}`, data)
    },
    changeAvatar(user, file) {
        return axios.put(`users/${user.id}`, file)
    }
}