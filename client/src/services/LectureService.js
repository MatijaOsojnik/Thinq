import Api from '@/services/Api'

export default {
    index() {
        return Api().get('lectures')
    },
    show(lectureId) {
        return Api().get(`lectures/${lectureId}`)
    },
    post(lecture) {
        return Api().post('lectures', lecture)
    },
    put(lecture) {
        return Api().put(`lectures/${lecture.id}`, lecture)
    }
 }