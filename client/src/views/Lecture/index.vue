<template>
  <LectureMetadata :lecture="lecture">
    <template v-slot:similar>
      <v-slide-group
        class="pa-4"
        show-arrows
        v-if="categoryLectures.length"
      >
        <v-slide-item v-for="lecture in categoryLectures" :key="lecture.id">
          <CardRecommended :lecture="lecture"/>
        </v-slide-item>
      </v-slide-group>
    </template>
    <template v-slot:other>
      <v-slide-group class="pa-4" show-arrows v-if="differentLectures.length">
        <v-slide-item v-for="lecture in differentLectures" :key="lecture.id">
          <CardRecommended :lecture="lecture"/>
        </v-slide-item>
      </v-slide-group>
    </template>
  </LectureMetadata>
</template>

<script>
import LectureService from "@/services/LectureService.js";
import LectureMetadata from "@/views/Lecture/LectureMetadata.vue";
import CardRecommended from "@/components/Card-Recommended"
export default {
  components: {
    LectureMetadata,
    CardRecommended
  },
  data: () => ({
    lecture: null,
    categoryLectures: null,
    differentLectures: null
  }),
  mounted() {
    this.getLecture();
  },
    watch: {
    // call again the method if the route changes
    '$route': 'getLecture'
  },
  methods: {
    async getLecture() {
      const lectureId = this.$route.params.id;
      const responseLecture = await LectureService.show(lectureId);
      const responseSimilarLectures = await LectureService.showSimilar(
        responseLecture.data.category_id,
        lectureId
      );
      const responseDifferentLectures = await LectureService.showDifferent(
        responseLecture.data.category_id,
        lectureId
      );
      this.lecture = responseLecture.data;
      this.categoryLectures = responseSimilarLectures.data;
      this.differentLectures = responseDifferentLectures.data;
    }
  }
};
</script>

<style scoped>
.back-link {
  font-size: 15px;
  color: #52616b;
  margin-top: 20px;
}
.back-link:hover {
  color: #303841;
}
.lecture-count {
  display: inline-block;
  font-size: 16px;
}
</style>