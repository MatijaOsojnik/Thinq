<template>
  <v-container fluid>
    <slot name="lectures-panel">
      <div class="d-flex justify-center align-center flex-column fill-height" style="height: 70vh;">
        <span class="display-1 d-block">There's nothing here :(</span>
        <v-btn class="ma-4" :to="{name: 'lectures'}">View All Lectures</v-btn>
      </div>
    </slot>
  </v-container>
</template>

<script>
export default {
  data: () => ({})
};
</script>