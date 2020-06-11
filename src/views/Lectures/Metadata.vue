<template>
  <v-container fluid>
    <slot name="lectures-panel">
      <div class="d-flex justify-center align-center flex-column fill-height" style="height: 70vh;">
        <span class="display-1 d-block">There are no lectures in this category yet.</span>
        <v-btn class="ma-4" :to="{name: 'lectures'}">Browse All Lectures</v-btn>
      </div>
    </slot>
  </v-container>
</template>

<script>
export default {
  data: () => ({})
};
</script>