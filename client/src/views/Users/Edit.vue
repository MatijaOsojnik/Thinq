<template>
  <v-container>
    <v-row>
      <v-col class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
        <div>OKAT</div>
      </v-col>
      <v-col class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
        <div class="d-flex flex-column">
          <span class="title">YOUR ACCOUNT</span>
          <v-scroll-x-transition>
            <v-alert type="warning" mode="out-in" v-if="errors.length">
              <ul>
                <li v-for="error in errors" :key="error">{{ error }}</li>
              </ul>
            </v-alert>
          </v-scroll-x-transition>
          <v-form lazy-validation>
            <v-text-field label="Display Name" v-model="user.display_name"></v-text-field>
            <v-text-field label="Email" v-model="user.email"></v-text-field>
            <v-text-field label="Password" type="password" v-model="newPassword"></v-text-field>
            <v-text-field label="Phone Number" v-model="user.phone_num"></v-text-field>
            <v-btn solo @click="updateUser"></v-btn>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserService from "@/services/UserService.js";
export default {
  data: () => ({
    user: {
      display_name: ``,
      email: ``,
      phone_num: ``
    },
    newPassword: ``,
    errors: []
  }),
  mounted() {
    this.getUser()
  },
  methods: {
    async updateUser() {
      try {
        if(this.newPassword !== ``){
          this.user.password = this.newPassword
        }
        await UserService.put(this.user);
        this.$router.push({
          path: `/users/${(this.$store.state.user.display_name).toLowerCase()}/${this.$store.state.user.id}/profile`
        });
      } catch (err) {
        this.errors = err.response.data;
        console.log(err)
        setTimeout(() => (this.errors = []), 5000);
      }
    },
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