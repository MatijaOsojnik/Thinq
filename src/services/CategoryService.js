import axios from '@/services/axios'

export default {
    index() {
        return axios.get('categories')
    },
    postCategory(data) {
        return axios.post('categories', data)
    }
}