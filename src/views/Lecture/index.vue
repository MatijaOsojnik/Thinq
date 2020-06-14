<template>
  <LectureMetadata>
    <template v-slot:lecture>
      <v-row class="ma-sm-6 ma-xl-0 ma-lg-0 ma-md-0" v-if="lecture">
        <v-col class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
          <h1 class="display-3" style="margin-top: 1rem;">{{lecture.title}}</h1>
          <router-link :to="{name: 'lecture-edit', params: {id: $route.params.id}}">
            <v-btn style="margin: 1.5rem 0;" icon v-if="isOwner">
              <v-icon medium color="black">mdi-pencil</v-icon>
            </v-btn>
          </router-link>
          <router-link :to="{name: 'lectures'}">
            <v-btn style="margin: 1.5rem 0;" icon v-if="isOwner" @click="deleteLecture">
              <v-icon medium color="black">mdi-delete-forever</v-icon>
            </v-btn>
          </router-link>
          <div style="margin: 1rem 0" class="d-flex flex-column justify-space-around">
            <div>
              <div v-html="lecture.description"></div>
            </div>
          </div>
        </v-col>
        <v-col
          class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 d-flex justify-lg-start justify-md-start justify-sm-center justify-center"
        >
          <v-card max-width="350px" max-height="400px">
            <v-img
              :src="lecture.thumbnail_url"
              lazy-src="@/assets/blue-error-background.jpg"
              height="250px"
              width="350px"
            ></v-img>
            <v-card-text>
              <div class="d-flex justify-space-around align-center">
                <span class="lecture-count">Exercises</span>
                <span class="lecture-count">Lectures</span>
              </div>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-hover v-slot:default="{ hover }">
                <router-link
                  :to="$store.state.isUserLoggedIn ? {name: 'lectureAction'} : {name: 'register'}"
                >
                  <v-btn :class="`${hover ? 'cta-btn-hover' : 'cta-btn-active'}`">Get Started</v-btn>
                </router-link>
              </v-hover>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </template>
    <template v-slot:similar>
      <v-slide-group class="pa-4" show-arrows v-if="categoryLectures.length">
        <v-slide-item v-for="lecture in categoryLectures" :key="lecture.id">
          <CardRecommended :lecture="lecture" />
        </v-slide-item>
      </v-slide-group>
    </template>
    <template v-slot:other>
      <v-slide-group class="pa-4" show-arrows v-if="differentLectures.length">
        <v-slide-item v-for="lecture in differentLectures" :key="lecture.id">
          <CardRecommended :lecture="lecture" />
        </v-slide-item>
      </v-slide-group>
    </template>
  </LectureMetadata>
</template>

<script>
import LectureService from "@/services/LectureService.js";
import LectureMetadata from "@/views/Lecture/Metadata.vue";
import CardRecommended from "@/components/Card-Recommended";
export default {
  components: {
    LectureMetadata,
    CardRecommended
  },
  data: () => ({
    lecture: null,
    permissions: false,
    isOwner: false,
    categoryLectures: [],
    differentLectures: []
  }),
  mounted() {
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
        const responseLecture = await LectureService.show(lectureId);
        const responseSimilarLectures = await LectureService.showSimilar(
          responseLecture.data.category_id,
          lectureId
        );
        const responseDifferentLectures = await LectureService.showDifferent(
          responseLecture.data.category_id,
          lectureId
        );
        if(this.$store.state.user){
          if(responseLecture.data.Users[0].id === this.$store.state.user.id){
            this.isOwner = true
          }else{
            this.isOwner = false
          }
        }
        this.lecture = responseLecture.data;
        this.categoryLectures = responseSimilarLectures.data;
        this.differentLectures = responseDifferentLectures.data;
      } catch (err) {
        console.log(err);
      }
    },
    async deleteLecture() {
      try {
        const lectureId = this.$route.params.id;
        if (this.permisions) {
          await LectureService.delete(lectureId);
        }
      } catch (err) {
        console.log(err);
      }
    },
    checkRoles() {
      const userAuthorities = this.$store.state.authorities;
      let hasPriviliges = false;
      if (userAuthorities) {
        for (let i = 0; i < userAuthorities.length; i++) {
          if (
            userAuthorities[i] === "ROLE_LECTURER" ||
            userAuthorities[i] === "ROLE_MODERATOR" ||
            userAuthorities[i] === "ROLE_ADMIN"
          ) {
            hasPriviliges = true;
          }
        }
      }
      if (hasPriviliges) {
        this.permissions = true;
      }
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
  display: inline-block;
  font-size: 16px;
}
</style>