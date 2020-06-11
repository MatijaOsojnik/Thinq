<template>
  <v-container fluid>
    <slot name="lectures-panel">
      <span class="heading ma-4 d-block">There's nothing here:(</span>
    </slot>
  </v-container>
</template>

<script>
import LectureService from "@/services/LectureService.js";
export default {
  components: {
  },
  data: () => ({
  }),
  mounted() {
    this.getLectures();
  },
  methods: {
    async getLectures() {
      const response = await LectureService.index();
      this.lectures = response.data;
    }
  }
};
</script>