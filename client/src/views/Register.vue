<template>
  <v-app>
    <div height="100vh" class="main">
      <v-row class="row-container">
        <v-col class="col-xl-5 col-lg-6 col-md-7 col-sm-12">
          <v-container class="form-container">
            <div>
              <span class="brand">Thinq</span>
            </div>
            <v-container class="form-input-container">
              <v-container>
                <form action>
                  <div>
                    <v-text-field label="Display Name" prepend-inner-icon="mdi-account-outline" />
                  </div>
                  <div>
                    <v-text-field label="Email"  prepend-inner-icon="mdi-email-outline" />
                  </div>
                  <div>
                    <v-text-field label="Password" prepend-inner-icon="mdi-lock-outline" />
                  </div>
                  <div>
                    <v-text-field label="Repeat Password" prepend-inner-icon="mdi-lock-outline"/>
                  </div>
                </form>
                <v-btn color="primary" class="submit-btn" max-width="60%" @click="submit">Register</v-btn>
              <div class="sign-in-container">
                  <span class="sign-in-text">Already have an account? <span><router-link class="sign-in-link" to="{name: 'login'}">Sign in</router-link></span></span>
              </div>
              </v-container>
            </v-container>
          </v-container>
        </v-col>
        <v-col class="col-xl-7 col-lg-6 col-md-5 d-xl-block d-lg-block d-md-block d-sm-none d-none" style="padding: 0">
          <div class="fill-height d-flex justify-center align-center">
              <v-img src="../assets/social-ideas.svg" class="background-image">
              </v-img>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    formHasErrors: true
  })
};
</script>

<style scoped>
div {
    font-family: "Lato"
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
  width: 50%;
}
.brand {
  color: black;
  font-weight: 900;
  font-size: 40px;
  font-family: "Patrick Hand SC", cursive;
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