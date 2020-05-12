import Api from '@/services/Api'

export default {
    index() {
        return Api().get('lectures')
    },
    singleLecture(lectureId) {
        return Api().get(`lectures/${lectureId}`)
    },
    postLecture(data) {
        return Api().post('lectures', data)
    },
}