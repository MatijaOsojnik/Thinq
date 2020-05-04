<template>
  <v-app>
      <div>
      <Header/>
      </div>
    <div>
        <v-card v-for="lecture in lectures" :key="lecture.id">
            <v-card-title>{{lecture.name}}</v-card-title>
            <v-card-content>
                <p>{{lecture.description}}</p>
                <p>{{lecture.category_id}}</p>
            </v-card-content>
        </v-card>
    </div>
  </v-app>
</template>

<script>
import Header from '@/components/Header/Header'
import LecturesService from '@/services/LecturesService.js'
export default {
    components: {
        Header
    },
    data: () => ({
        lectures: null
    }),
    mounted () {
        this.getLectures()
    },
    methods: {
        async getLectures() {
            const response = await LecturesService.index()
            this.lectures = response.data
            console.log(this.lectures)

        }
    }
};

</script>

<style scoped>

</style>