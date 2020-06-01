<template>
  <div>
    <v-app-bar
      flat
      color="#d3fgsg"
      elevate-on-scroll
      scroll-target="#scrolling-target"
      v-if="$store.state.isUserLoggedIn"
    >
      <v-toolbar-title>
        <router-link :to="{name: 'lectures'}" class="brand-black">Thinq</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-text-field append-icon="mdi-magnify" flat hide-details :v-model="search" solo style="max-width: 300px;" /> -->

      <!-- <v-menu bottom transition="slide-y-transition">
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
      </v-menu>-->

      <v-menu
        bottom
        left
        transition="slide-x-reverse-transition"
        :close-on-content-click="false"
        v-if="$store.state.isUserLoggedIn"
      >
        <template v-slot:activator="{ on }">
          <v-btn color="indigo" v-on="on" icon style="margin-left: 30px;">
            <v-avatar v-if="!$store.state.user.icon_url">
              <v-icon large>mdi-account-circle</v-icon>
            </v-avatar>
            <v-avatar v-else>
                <img :src="'localhost:8082/' + $store.state.user.icon_url" />
            </v-avatar>
          </v-btn>
        </template>

        <v-card max-width="200px">
          <v-container fluid>
            <div class="d-flex justify-center align-center flex-column ma-3">
              <router-link :to="{path: `/users/${($store.state.user.display_name).toLowerCase()}/${$store.state.user.id}/profile`}">
                <v-icon x-large>mdi-account-circle</v-icon>
              </router-link>
              <router-link
                class="d-block ma-2 bold"
                style="font-size: 16px;"
                :to="{path: `/users/${($store.state.user.display_name).toLowerCase()}/${$store.state.user.id}/profile`}"
              >
                <span>{{$store.state.user.display_name}}</span>
              </router-link>
              <v-btn depressed small block :to="{path: `/users/${($store.state.user.display_name).toLowerCase()}/${$store.state.user.id}/profile`}">VIEW PROFILE</v-btn>
            </div>
            <v-divider />
            <div class="d-flex justify-center align-center flex-column ma-3">
              <v-btn
                class="ma-1"
                depressed
                small
                text
                block
                :to="{path: `/users/lectures/${($store.state.user.display_name).toLowerCase()}/${$store.state.user.id}`}"
              >My lectures</v-btn>
              <v-btn
                class="ma-1"
                depressed
                small
                text
                block
                :to="{path: `/users/${($store.state.user.display_name).toLowerCase()}/${$store.state.user.id}`}"
              >Edit account</v-btn>

              <v-btn class="ma-1" depressed small text block @click="logout">Log out</v-btn>
            </div>
            <!-- <v-list-item @click="toPath">My lectures</v-list-item>
                <v-list-item @click="toPath">Settings</v-list-item>
                <v-list-item @click="logout">Log out</v-list-item>
            </v-list>-->
          </v-container>
        </v-card>
      </v-menu>
      <div id="scrolling-target"></div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  props: {
    search: String
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