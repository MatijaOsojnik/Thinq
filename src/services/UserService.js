import axios from '@/services/axios'

export default {
    index() {
        return axios.get('users')
    },
    show(userId) {
        return axios.get(`users/${userId}`)
    },
    showAuthenticated(config) {
        return axios.get(`users/me`, config)
    },
    put(user) {
        return axios.put(`users/${user.id}`, user)
    },
    changeAvatar(user, file) {
        return axios.put(`users/${user.id}`, file)
    }
}