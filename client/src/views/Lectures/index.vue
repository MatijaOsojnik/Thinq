<template>
  <v-app>
    <LecturesPanel />
  </v-app>
</template>

<script>
import LectureService from "@/services/LectureService.js";
import LecturesPanel from "@/views/Lectures/Lectures-Panel.vue"
export default {
  components: {
    LecturesPanel
  },
  data: () => ({
    lectures: null
  }),
  mounted() {
    this.getLectures();
  },
  methods: {
    async getLectures() {
      const response = await LectureService.index();
      this.lectures = response.data;
      this.lectures.description.innerHTML = this.lectures.description;
    }
  }
};
</script>

<style scoped>
/* .greeting-title {
  font-weight: 800;
  font-size: 24px;
  padding: 10px;
  display: block;
}
.greeting-name {
  background-color: #c2f0fc;
}
.invisible {
  color: rgb(63, 114, 175, 0) !important;
}
.show-btns {
  color: rgb(255, 255, 255, 1) !important;
} */
</style>