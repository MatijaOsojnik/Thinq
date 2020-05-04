<template>
  <AuthenticationPanel
    authenticationTypeText="Sign up to Thinq"
    route-name="login"
    link-name="Sign in"
  >
    <v-alert outlined elevation="2" v-if="errors.length">
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </v-alert>
    <form @submit.prevent="handleSubmit" autocomplete="off">
      <div>
        <v-text-field
          label="Display Name"
          v-model="display_name"
          prepend-inner-icon="mdi-account-outline"
        />
      </div>
      <div>
        <v-text-field label="E-mail" v-model="email" prepend-inner-icon="mdi-email-outline" />
      </div>
      <div>
        <v-text-field
          type="password"
          autocomplete="new-password"
          label="Password"
          v-model="password"
          prepend-inner-icon="mdi-lock-outline"
        />
      </div>
      <div>
        <v-text-field
          type="password"
          label="Repeat Password"
          v-model="repeat_password"
          prepend-inner-icon="mdi-lock-outline"
        />
      </div>
    </form>
    <v-btn color="primary" class="submit-btn" max-width="60%" @click="register">Register</v-btn>
  </AuthenticationPanel>
</template>

<script>
import AuthenticationPanel from "@/components/Authentication-Panel/Authentication-Panel";
import AuthenticationService from "@/services/AuthenticationService";
export default {
  components: {
    AuthenticationPanel
  },
  data: () => ({
    display_name: "",
    email: "",
    password: "",
    repeat_password: "",
    errors: []
  }),
  methods: {
    async register() {
      try {
        const response = await AuthenticationService.register({
          display_name: this.display_name,
          email: this.email,
          password: this.password,
          repeat_password: this.repeat_password
        });
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
      } catch (error) {
        this.errors = error.response.data;
      }
    }
  }
};
</script>

<style scoped>
div {
  font-family: "Lato";
}
ul,
li {
  text-align: left;
}
/* .image-background {
  height: 100vh;
  background: url("../assets/social-ideas.svg");
  background-size: cover;
} */
.row-container {
  height: 100vh;
}
.background-image {
  max-width: 80%;
}
.image-container {
  background-color: #f9f9f9;
}
.form-container {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
.form-input-container {
  display: flex;
  justify-content: center;
  width: 60%;
}
.brand {
  color: black;
  font-weight: 900;
  font-size: 40px;
  font-family: "Patrick Hand SC", cursive;
}
.sign-in-brand {
  font-size: 23px;
  font-weight: 600;
  color: black;
}
.submit-btn {
  color: white;
  margin: 10px 0;
}
.sign-in-container {
  margin: 1.5rem 0;
}
.sign-in-text {
  display: inline-block;
}
.sign-in-link {
  display: inline-block;
  font-weight: bold;
  text-decoration: none;
}
</style>