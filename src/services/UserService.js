import Api from '@/services/Api'

export default {
    index() {
        return Api().get('users')
    },
    show(userId) {
        return Api().get(`users/${userId}`)
    },
    put(user) {
        return Api().put(`users/${user.id}`, user)
    },
    changeAvatar(user, file) {
        return Api().put(`users/${user.id}`, file)
    }
}