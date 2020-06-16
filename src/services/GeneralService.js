import axios from '@/services/axios'

export default {
    count() {
        return axios.get('admin/general/count',)
    }
}