<template>
  <v-container>
    <router-link :to="{name: 'lectures'}" class="back-link" style="margin-top: 20px;">
      <v-icon dense>mdi-chevron-left</v-icon>Back to all lectures
    </router-link>

    <div>
      <span class="title ma-4 d-block">Your lectures</span>
      <slot name="yourLectures">
        <span class="heading ma-4 d-block">Loading..</span>
      </slot>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({})
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