import Api from '@/services/Api'

export default {
    index(userId, file) {
        return Api().post(`users/${userId}/upload`, file)
    },
}