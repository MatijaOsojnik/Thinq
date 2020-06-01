import Api from '@/services/Api'

export default {
    index() {
        return Api().get('categories')
    },
    postCategory(data) {
        return Api().post('categories', data)
    }
}