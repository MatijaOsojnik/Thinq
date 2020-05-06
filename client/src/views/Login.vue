<template>
  <div>
    <AuthenticationPanel
      authenticationTypeText="Sign in to Thinq"
      route-name="register"
      link-name="Sign up"
    >
      <v-alert outlined elevation="2" v-if="error">
        <ul>
          <li :error="error">{{ error }}</li>
        </ul>
      </v-alert>
      <form @submit.prevent="handleSubmit">
        <div>
          <v-text-field label="E-mail" v-model="email" prepend-inner-icon="mdi-email-outline" />
        </div>
        <div>
          <v-text-field
            type="password"
            label="Password"
            v-model="password"
            prepend-inner-icon="mdi-lock-outline"
          />
        </div>
      </form>
      <v-btn color="primary" class="submit-btn" max-width="60%" @click="login">Login</v-btn>
    </AuthenticationPanel>
  </div>
</template>

<script>
import AuthenticationPanel from "@/components/Authentication-Panel/Authentication-Panel";
import AuthenticationService from "@/services/AuthenticationService";
export default {
  components: {
    AuthenticationPanel,
  },
  data: () => ({
    email: "",
    password: "",
    error: null
  }),
  methods: {
    async login() {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        });
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        this.$router.push({
          name: "lectures"
        });
      } catch (error) {
        this.error = error.response.data.error;
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
.main {
  margin: 0;
  padding: 0;
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
  background-color: #ededed;
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
.error {
  color: red;
}
</style>