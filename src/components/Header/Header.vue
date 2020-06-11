<template>
  <v-app-bar flat color="transparent" :class="{'header-bar': ($router.history.current['path'] === '/' || $router.history.current['path'] === '/login' || $router.history.current['path'] === '/register')}" v-if="!$store.state.isUserLoggedIn">
    <v-toolbar-title v-if="$router.history.current['path'] === '/'">
      <router-link :to="{name: 'landing'}" class="brand">Thinq</router-link>
    </v-toolbar-title>
    <v-toolbar-title v-else>
      <router-link :to="{name: 'landing'}" class="brand-black">Thinq</router-link>
    </v-toolbar-title>
    <v-menu bottom transition="scale-transition" :close-on-content-click="false" v-if="$router.history.current['path'] === '/lectures' || !$store.state.isUserLoggedIn">
      <template v-slot:activator="{ on }">
        <v-btn :outlined="$router.history.current['path'] === '/' ? true : false" :color="`${$router.history.current['path'] === '/' ? 'white' : '#ededed'}`" v-on="on" style="margin-left: 30px;">
          Browse
          <v-icon small>mdi-menu-down</v-icon>
        </v-btn>
      </template>

      
        <v-card max-width="200px">
          <v-container fluid>
            <div class="d-flex justify-center align-center flex-column ma-3">
              <v-btn
                depressed
                small
                block
                :to="{path: `/lectures`}"
              >All Lectures</v-btn>
            </div>
            <v-divider />
            <span class="subtitle ma-2 d-block bold text-center">Categories</span>
            <div
              class="d-flex justify-center align-center flex-column ma-1"
              v-for="category in categories"
              :key="category.id"
            >
              <v-btn
                depressed
                small
                text
                block
                :to="{path: `/lectures/categories/${category.id}`}"
              >{{category.name}}</v-btn>
            </div>
          </v-container>
        </v-card>
    </v-menu>
    <v-spacer></v-spacer>
    <router-link :to="{name: 'register'}">
      <v-btn outlined :color="`${$router.history.current['path'] === '/' ? 'white' : '#005082'}`" v-if="!$store.state.isUserLoggedIn && $router.history.current['path'] !== '/login' && $router.history.current['path'] !== '/register'">Sign in</v-btn>
    </router-link>
  </v-app-bar>
</template>

<script>
import CategoryService from "@/services/CategoryService.js";
export default {
  data: () => ({
    menu: false,
    categories: null,
  }),
  mounted() {
    this.getCategories();
  },
  methods: {
    async logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push({
        name: "login"
      });
    },
    async getCategories() {
      const response = await CategoryService.index();
      this.categories = response.data;
    },
    async toPath() {
      this.$router.push({
        path: `/lectures`
      });
    }
  },
};
</script>

<style scoped>
.header-bar {
  position: absolute;
  z-index: 999;
}

.brand-black {
  font-family: "Patrick Hand SC", cursive;
  color: #1b262c !important;
  opacity: 0.9;
  font-weight: 900 !important;
  font-size: 40px !important;
}
.brand {
  font-family: "Patrick Hand SC", cursive;
  color: white !important;
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