<template>
  <LectureMetadata :lecture="lecture"/>
</template>

<script>
import LectureService from "@/services/LectureService.js";
import LectureMetadata from "@/views/Lecture/LectureMetadata.vue";
export default {
  components: {
    LectureMetadata
  },
  data: () => ({
    lecture: null
  }),
  mounted() {
    this.getLecture();
  },
  methods: {
    async getLecture() {
      const lectureId = this.$route.params.id;
      const response = await LectureService.show(lectureId);
      this.lecture = response.data;
    }
  }
};
</script>