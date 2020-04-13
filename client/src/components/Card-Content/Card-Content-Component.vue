<template>
  <v-container>
    <v-card class="mx-auto" max-width="300">
      <v-img height="150" width=300 :src="require(`../../assets/${imageUrl}`)"></v-img>
      <v-card-title :title="title">{{title}}</v-card-title>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: [
      "imageUrl",
      "title"
  ]
};
</script>

<style>
</style>