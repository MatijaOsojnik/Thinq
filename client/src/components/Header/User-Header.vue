<template>
  <div>
    <v-app-bar flat color="#d3fgsg" v-if='$store.state.isUserLoggedIn'>
      <v-toolbar-title>
        <router-link :to="{name: 'lectures'}" class="brand-black">Thinq</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn outlined @click="logout">Log out</v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push({
        name: "login"
      });
    }
  }
};
</script>

<style scoped>

.brand-black {
  font-family: "Patrick Hand SC", cursive;
  color: #1b262c;
  opacity: 0.9;
  font-weight: 900 !important;
  font-size: 40px !important;
}
.brand {
  font-family: "Patrick Hand SC", cursive;
  color: white;
  font-weight: 900 !important;
  font-size: 40px !important;
}
.cta-btn-active {
  background-color: #3f72af !important;
  color: white !important;
  transition: 0.2s;
}
.cta-btn-hover {
  background-color: white !important;
  color: black !important;
  transition: 0.2s;
}
</style>