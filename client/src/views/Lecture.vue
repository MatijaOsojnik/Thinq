<template>
  <v-container>
      <v-row no-gutters>
          <v-col>
              {{lecture.title}}
          </v-col>
          <v-col>
              {{lecture.description}}
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
import LectureService from "@/services/LectureService.js";
export default {
  data: () => ({
    lecture: null
  }),
  mounted() {
    this.getLecture();
  },
  methods: {
    async getLecture() {
    const lectureId = this.$route.params.id
      const response = await LectureService.singleLecture(lectureId);
      this.lecture = response.data;
    }
  }
};
</script>

<style>

</style>