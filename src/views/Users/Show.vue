<template>
  <div>
    <Header />
    <v-container v-if="user" max-width="1400px">
      <v-row>
        <v-col class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 d-sm-flex justify-sm-center">
          <div
              class="d-flex justify-center align-center flex-column ma-1"
            >
              <h4>{{user.display_name}}</h4>
            </div>
        </v-col>
        <v-col>

        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import UserService from "@/services/UserService.js";
import Header from "@/components/Header/Header";
export default {
  components: {
    Header
  },
  data: () => ({
    user: null
  }),
  mounted() {
    this.getUser();
  },
  methods: {
    async getUser() {
      try {
        const userId = this.$route.params.id;
        const response = await UserService.show(userId);
        this.user = response.data;
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style>
</style>