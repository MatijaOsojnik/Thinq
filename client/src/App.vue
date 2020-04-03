<template>
  <v-app>
    <v-content>
        <Landing></Landing>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Landing from '@/views/Landing';

export default {
  name: 'App',

  components: {
    Landing
  },

  data: () => ({
    //
  }),
};
</script>
