import Api from '@/services/Api'

export default {
    index() {
        return Api().get('lectures')
    },
    show(lectureId) {
        return Api().get(`lectures/${lectureId}`)
    },
    showSimilar(categoryId, lectureId) {
        return Api().get(`lectures/categories/similar/${categoryId}/${lectureId}`)
    },
    showDifferent(categoryId, lectureId) {
            return Api().get(`lectures/categories/other/${categoryId}/${lectureId}`)
        }, post(lecture) {
        return Api().post('lectures', lecture)
    },
    put(lecture) {
        return Api().put(`lectures/${lecture.id}`, lecture)
    }
 }