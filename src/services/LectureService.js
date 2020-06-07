import axios from '@/services/axios'

export default {
    index() {
        return axios.get('lectures')
    },
    show(lectureId) {
        return axios.get(`lectures/${lectureId}`)
    },
    showSimilar(categoryId, lectureId) {
        return axios.get(`lectures/categories/similar/${categoryId}/${lectureId}`)
    },
    showDifferent(categoryId, lectureId) {
        return axios.get(`lectures/categories/other/${categoryId}/${lectureId}`)
    },
    post(lecture) {
        return axios.post('lectures', lecture)
    },
    put(lecture) {
        return axios.put(`lectures/${lecture.id}`, lecture)
    },
    delete(lectureId) {
        return axios.delete(`lectures/${lectureId}`)
    }
}