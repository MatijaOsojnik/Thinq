<template>
  <v-container fluid>
    <!-- <v-row>
    <v-col class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">-->
    <v-card height="450px" max-height="500px" max-width="1200px" class="mx-auto">
      <v-toolbar flat color="#617BE3" dark>
        <v-toolbar-title>User Profile</v-toolbar-title>
      </v-toolbar>
      <v-tabs vertical color="#617BE3">
        <v-tab>
          <v-icon left>mdi-account-circle</v-icon>Avatar
        </v-tab>
        <v-divider />
        <v-tab>
          <v-icon left>mdi-account-cog</v-icon>Personal Info
        </v-tab>
        <v-divider />
        <v-tab>
          <v-icon left>mdi-email</v-icon>Email
        </v-tab>
        <v-divider />
        <v-tab>
          <v-icon left>mdi-shield-lock</v-icon>Password
        </v-tab>
        <v-tab-item>
          <v-card flat class="mx-4">
            <v-card-text>
              <v-scroll-x-transition>
                <v-alert type="warning" mode="out-in" v-if="errors.length">
                  <ul>
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                  </ul>
                </v-alert>
              </v-scroll-x-transition>
              <v-form enctype="multipart/form-data" autocomplete="off">
                <label for="avatar">Avatar</label>
                <v-file-input
                  :rules="rules.avatarRules"
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="Pick an avatar"
                  prepend-icon="mdi-camera"
                  label="Avatar"
                  solo
                  :loading="uploading"
                  v-model="file"
                ></v-file-input>
                <v-scroll-x-transition>
                  <v-alert type="success" mode="out-in" v-if="uploadedFile">
                    <span>You successfuly changed your avatar.</span>
                  </v-alert>
                  <!-- <v-container fluid>
                    <img :src="'http://localhost:8082' + uploadedFile"/>
                  </v-container>-->
                </v-scroll-x-transition>

                <v-btn solo @click="submitAvatar">SUBMIT</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat class="mx-4">
            <v-card-text>
              <v-scroll-x-transition>
                <v-alert type="warning" mode="out-in" v-if="errors.length">
                  <ul>
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                  </ul>
                </v-alert>
              </v-scroll-x-transition>
              <v-form lazy-validation autocomplete="off">
                <label for="displayName">Display Name</label>
                <v-text-field id="displayName" class="mt-2" solo v-model="user.display_name"></v-text-field>
                <!-- <v-scroll-x-transition>
                  <v-alert type="success" mode="out-in" v-if="successfulUpdate">
                    <span>You successfuly changed your display name.</span>
                  </v-alert>
                </v-scroll-x-transition> -->
                <v-btn solo @click="updateUser">SUBMIT</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat class="mx-4">
            <v-card-text>
              <v-scroll-x-transition>
                <v-alert type="warning" mode="out-in" v-if="errors.length">
                  <ul>
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                  </ul>
                </v-alert>
              </v-scroll-x-transition>
              <v-form lazy-validation autocomplete="off">
                <label for="email">Email</label>
                <v-text-field id="email" class="mt-2" solo v-model="user.email"></v-text-field>
                <!-- <v-scroll-x-transition>
                  <v-alert type="success" mode="out-in" v-if="successfulUpdate">
                    <span>You successfuly changed your email.</span>
                  </v-alert>
                </v-scroll-x-transition> -->
                <v-btn solo @click="updateUser">SUBMIT</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat class="mx-4">
            <v-card-text>
              <v-scroll-x-transition>
                <v-alert type="warning" mode="out-in" v-if="errors.length">
                  <ul>
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                  </ul>
                </v-alert>
              </v-scroll-x-transition>
              <v-form lazy-validation autocomplete="off">
                <label for="password">Password</label>
                <v-text-field
                  id="password"
                  class="mt-2"
                  type="password"
                  placeholder="Enter New Password Here"
                  solo
                  v-model="newPassword"
                  autocomplete="off"
                ></v-text-field>
                <label for="repeatPassword">Repeat Password</label>
                <v-text-field
                  id="repeatPassword"
                  class="mt-2"
                  solo
                  placeholder="Re-enter New Password"
                  type="password"
                  v-model="repeatPassword"
                  autocomplete="off"
                ></v-text-field>
                <v-scroll-x-transition>
                  <v-alert type="success" mode="out-in" v-if="successfulPasswordUpdate">
                    <span>You successfuly changed your password.</span>
                  </v-alert>
                </v-scroll-x-transition>
                <v-btn solo @click="updateUser">SUBMIT</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
    <!-- </v-col>
      <v-col class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
        <v-card>
          <div class="d-flex flex-column container">
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
        </v-card>
      </v-col>
    </v-row>-->
  </v-container>
</template>

<script>
import UserService from "@/services/UserService.js";
import FileService from "@/services/FileService.js";
export default {
  data: () => ({
    rules: {
      avatarRules: [
        value =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!"
      ],
      passwordRules: []
    },
    user: {
      display_name: ``,
      email: ``,
      phone_num: ``
    },
    file: null,
    newPassword: ``,
    repeatPassword: ``,
    uploadedFile: null,
    uploading: false,
    successfulUpdate: false,
    successfulPasswordUpdate: false,
    errors: []
  }),
  created() {
    this.getUser();
  },
  // computed: {
  //   updateUser: {
  //     get() {
  //       return this.$store.state.obj.message;
  //     },
  //     set(value) {
  //       this.$store.commit("updateUser", value);
  //     }
  //   }
  // },
  methods: {
    // onSelect() {
    //   this.file = this.$refs.file.files[0]
    //   console.log(this.$refs.file.files)
    // },
    async submitAvatar() {
      this.uploading = true;
      const userId = this.user.id;
      const formData = new FormData();
      formData.append("file", this.file);
      try {
        const res = await FileService.index(userId, formData);
        this.uploadedFile = res.data.file;
        this.uploading = false;
        setTimeout(() => (this.uploadedFile = null), 5000);
        this.getUser();
      } catch (err) {
        this.uploading = false;
        this.errors.push(err.response.data.error);
        setTimeout(() => (this.errors = []), 5000);
      }
    },
    async updateUser() {
      try {
        if (
          this.newPassword !== `` &&
          this.newPassword === this.repeatPassword
        ) {
          this.user.password = this.newPassword;
          this.successfulPasswordUpdate = true;
          setTimeout(() => (this.successfulPasswordUpdate = false), 5000);
        } else {
          this.errors.push(`Passwords don't match.`)
          setTimeout(() => (this.errors = []), 5000);
        }
        await UserService.put(this.user);
        // this.$router.push({
        //   path: `/users/${this.$store.state.user.display_name.toLowerCase()}/${
        //     this.$store.state.user.id
        //   }/profile`
        // });
        this.newPassword = ''
        this.repeatPassword = ''
        this.getUser();
      } catch (err) {
        this.errors.push(err.response.data);
        console.log(err);
        setTimeout(() => (this.errors = []), 5000);
      }
    },
    async getUser() {
      try {
        const userId = this.$route.params.id;
        if(userId == this.$store.state.user.id){
          const response = await UserService.show(userId);
          this.user = response.data;
          this.$store.dispatch("setUser", this.user);
        }else{
          this.$router.push({
            name: 'lectures'
          })
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style>
</style>