import Api from '@/services/Api'

export default {
    index() {
        return Api().get('lectures')
    },
    postLecture(data) {
        return Api().post('lectures', data)
    }
}