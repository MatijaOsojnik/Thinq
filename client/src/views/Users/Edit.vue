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
            <v-text-field label="Password" v-model="password"></v-text-field>
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
      password: ``,
      phone_num: ``
    },
    password: ``,
    errors: []
  }),
  mounted() {
    this.user = this.$store.state.user
  },
  methods: {
    async updateUser() {
      // console.log(this.user)
      // const areAllFieldsFilledIn = Object.keys(this.user).every(
      //   key => !!this.user[key]
      // );
      // if (!areAllFieldsFilledIn) {
      // this.errors = ("Please fill in all the fields.");
      // return;
      // }
      try {
        const userId = this.$route.params.id;
        this.user.password = this.password
        console.log(this.user.password)
        await UserService.put(this.user);
        this.$router.push({
          name: "show-user",
          params: {
            id: userId
          }
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