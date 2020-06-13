<template>
  <LectureMetadata>
    <template v-slot:yourLectures>
      <v-row style="z-index: 100" class="flex-sm-fill">
        <v-col
          class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 d-sm-flex justify-sm-center"
          v-for="lecture in lectures"
          :key="lecture.id"
        >
          <LectureCardComponent :lecture="lecture" />
        </v-col>
      </v-row>
    </template>
  </LectureMetadata>
</template>

<script>
import LectureCardComponent from "@/components/Card-Lecture";
import LectureService from "@/services/LectureService";
import LectureMetadata from "@/views/Users/Metadata";

export default {
  components: {
    LectureCardComponent,
    LectureMetadata
  },
  data: () => ({
    lectures: null
  }),
  created() {
    this.getUserLectures();
  },
  methods: {
    async getUserLectures() {
      const response = await LectureService.user(this.$store.state.user.id);
      this.lectures = response.data;
    }
  }
};
</script>

<style>
</style>