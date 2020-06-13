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
                <v-alert elevation="2" type="warning" v-if="errors.length">
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
                <v-alert elevation="2" type="warning" v-if="errors.length">
                  <ul>
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                  </ul>
                </v-alert>
              </v-scroll-x-transition>
              <v-form lazy-validation autocomplete="off">
                <label for="displayName">Display Name</label>
                <v-text-field
                  id="displayName"
                  class="mt-2"
                  prepend-icon="mdi-account-outline"
                  solo
                  v-model="user.display_name"
                ></v-text-field>
                <label for="phoneNum">Phone Number</label>
                <v-text-field
                  id="phoneNum"
                  class="mt-2"
                  prepend-icon="mdi-phone"
                  solo
                  placeholder="Enter Your Phone Number"
                  v-model="user.phone_num"
                ></v-text-field>
                <label for="date">Birth Date</label>
                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="date"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      id="date"
                      solo
                      v-model="date"
                      prepend-icon="mdi-calendar"
                      v-bind="attrs"
                      placeholder="Enter Your Birth Date"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
                <v-scroll-x-transition>
                  <v-alert type="success" mode="out-in" v-if="successfulInfoUpdate">
                    <span>You successfuly changed your information.</span>
                  </v-alert>
                </v-scroll-x-transition>
                <v-btn solo @click="updateInfo">SUBMIT</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat class="mx-4">
            <v-card-text>
              <v-scroll-x-transition>
                <v-alert elevation="2" type="warning" v-if="errors.length">
                  <ul>
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                  </ul>
                </v-alert>
              </v-scroll-x-transition>
              <v-form lazy-validation autocomplete="off">
                <label for="email">Email</label>
                <v-text-field
                  id="email"
                  class="mt-2"
                  prepend-icon="mdi-email"
                  solo
                  v-model="user.email"
                ></v-text-field>
                <v-scroll-x-transition>
                  <v-alert type="success" mode="out-in" v-if="successfulEmailUpdate">
                    <span>You successfuly changed your email.</span>
                  </v-alert>
                </v-scroll-x-transition>
                <v-btn solo @click="updateEmail">SUBMIT</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat class="mx-4">
            <v-card-text>
              <v-scroll-x-transition>
                <v-alert elevation="2" type="warning" v-if="errors.length">
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
                  prepend-icon="mdi-lock-outline"
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
                  prepend-icon="mdi-lock-outline"
                  v-model="repeatPassword"
                  autocomplete="off"
                ></v-text-field>
                <v-scroll-x-transition>
                  <v-alert type="success" mode="out-in" v-if="successfulPasswordUpdate">
                    <span>You successfuly changed your password.</span>
                  </v-alert>
                </v-scroll-x-transition>
                <v-btn solo @click="updatePassword">SUBMIT</v-btn>
              </v-form>


            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
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
      phone_num: ``,
      date_birth: null
    },
    date: new Date("December 31, 2002 00:00:00").toISOString().substr(0, 10),
    file: null,
    modal: false,
    newPassword: ``,
    repeatPassword: ``,
    uploadedFile: null,
    uploading: false,
    successfulInfoUpdate: false,
    successfulEmailUpdate: false,
    successfulPasswordUpdate: false,
    errors: []
  }),
  created() {
    this.getUser();
  },
  methods: {
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
        this.errors = err.response.data;
        setTimeout(() => (this.errors = []), 5000);
      }
    },
    async updateInfo() {
      try {
        const userId = this.user.id;
        this.user.birth_date = this.date;

        const response = await UserService.put(userId, {
          display_name: this.user.display_name,
          phone_num: this.user.phone_num,
          birth_date: this.user.birth_date
        });
        if (response) {
          this.successfulInfoUpdate = true;
          setTimeout(() => (this.successfulInfoUpdate = false), 5000);
          this.date = this.user.birth_date;
        }
        this.getUser();
      } catch (err) {
        this.errors = err.response.data;
        setTimeout(() => (this.errors = []), 5000);
      }
    },
    async updateEmail() {
      try {
        const userId = this.user.id;
        const response = await UserService.put(userId, {
          email: this.user.email
        });
        if (response) {
          this.successfulEmailUpdate = true;
          setTimeout(() => (this.successfulEmailUpdate = false), 5000);
        }
        this.getUser();
      } catch (err) {
        this.errors = err.response.data;
        setTimeout(() => (this.errors = []), 5000);
      }
    },
    async updatePassword() {
      try {
        const userId = this.user.id;
        const response = await UserService.put(userId, {
          password: this.newPassword,
          repeat_password: this.repeatPassword
        });
        if (response) {
          this.successfulPasswordUpdate = true;
          setTimeout(() => (this.successfulPasswordUpdate = false), 5000);
        }
        this.newPassword = "";
        this.repeatPassword = "";
        this.getUser();
      } catch (err) {
        this.errors = err.response.data;
        setTimeout(() => (this.errors = []), 5000);
      }
    },
    async getUser() {
      try {
        const userId = this.$route.params.id;
        if (userId == this.$store.state.user.id) {
          const response = await UserService.show(userId);
          if(response.data.birth_date){
            this.date = response.data.birth_date.substr(0, 10)
          }
          this.user = response.data;
          this.$store.dispatch("setUser", this.user);
        } else {
          this.$router.push({
            name: "lectures"
          });
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