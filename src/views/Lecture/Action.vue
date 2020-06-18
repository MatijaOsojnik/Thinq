<template>
  <LectureMetadata>
    <template v-slot:lecture>
      <v-row class="ma-sm-6 ma-xl-0 ma-lg-0 ma-md-0" v-if="lecture">
        <v-col class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <h1 class="display-3" style="margin-top: 1rem;">{{lecture.title}}</h1>
          <div style="margin: 1rem 0" class="d-flex flex-column justify-space-around">
            <div>
              <div v-html="lecture.description"></div>
            </div>
          </div>
        </v-col>
      </v-row>
    </template>
  </LectureMetadata>
</template>

<script>
import LectureService from "@/services/LectureService.js";
import LectureMetadata from "@/views/Lecture/Metadata.vue";
export default {
  components: {
    LectureMetadata,
  },
  data: () => ({
    lecture: null,
    imageError: false,
  }),
  created() {
    this.getLecture();
    this.checkRoles();
  },
  watch: {
    // call again the method if the route changes
    $route: "getLecture"
  },
  methods: {
    async getLecture() {
      try {
        const lectureId = this.$route.params.id;
        const response = await LectureService.show(lectureId);
        this.lecture = response.data;
        this.imageError = false;
      } catch (err) {
        console.log(err);
      }
    },
    async deleteLecture() {
      try {
        const lectureId = this.$route.params.id;
        if (this.isOwner || this.adminPermissions) {
          await LectureService.delete(lectureId);
        }
      } catch (err) {
        console.log(err);
      }
    },
    checkRoles() {
      const userAuthorities = this.$store.state.authorities;
      if (userAuthorities) {
        for (let i = 0; i < userAuthorities.length; i++) {
          if (
            userAuthorities[i] === "ROLE_LECTURER" ||
            userAuthorities[i] === "ROLE_MODERATOR" ||
            userAuthorities[i] === "ROLE_ADMIN"
          ) {
            this.permissions = true;
          } else {
            this.permissions = false;
          }
        }
        for (let i = 0; i < userAuthorities.length; i++) {
          if (
            userAuthorities[i] === "ROLE_ADMIN" ||
            userAuthorities[i] === "ROLE_MODERATOR"
          ) {
            this.adminPermissions = true;
          } else {
            this.adminPermissions = false;
          }
        }
      }
    },
    async imageLoadError() {
      this.imageError = true;
    }
  }
};
</script>

<style scoped>
.back-link {
  font-size: 15px;
  color: #52616b;
  margin-top: 20px;
}
.back-link:hover {
  color: #303841;
}
.lecture-count {
  color: black;
  font-size: 20px;
}
</style>