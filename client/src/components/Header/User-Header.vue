<template>
  <div>
    <v-app-bar flat color="#d3fgsg" elevate-on-scroll scroll-target="#scrolling-target" v-if="$store.state.isUserLoggedIn">
      <v-toolbar-title>
        <router-link :to="{name: 'lectures'}" class="brand-black">Thinq</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field append-icon="mdi-magnify" flat hide-details :v-model="search" solo style="max-width: 300px;" />
     
      <v-menu bottom transition="slide-y-transition">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon color="black">mdi-dots-vertical</v-icon>
          </v-btn> 
        </template>

        <v-list>
          <v-list-item :to="{path: '/users/1'}">
            <v-list-item-title>User</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title>Log out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <div id="scrolling-target">
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data: () => ({
    
  }),
  props: {
    search: String,
  },
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