<template>
  <LecturesMetadata>
    <template v-slot:lectures-panel>
      <v-container fluid v-if="lectures">
        <div v-if="$store.state.isUserLoggedIn">
          <span class="greeting-title" v-if="$store.state.isUserLoggedIn && lectures">
            Welcome
            <span class="greeting-name pa-1">{{$store.state.user.display_name}}</span>! Start Your First Class :)
          </span>
        </div>
        <v-container fluid>
          <span class="title" v-if="$router.history.current['name'] === 'lectures'">All Lectures</span>
          <span
            class="title"
            v-else-if="$router.history.current['name'] === 'lectures-categories' && lectures"
          >{{lectures[0].Category.name}}</span>
          <v-row style="z-index: 100" class="flex-sm-fill">
            <v-col
              class="col-xl-2 col-lg-3 col-md-4 col-sm-6 cols-12 d-sm-flex justify-sm-center"
              v-if="priviliges"
            >
              <LectureCardCreateComponent :card="card"/>
            </v-col>
            <v-col
              class="col-xl-2 col-lg-3 col-md-4 col-sm-6 cols-12 d-sm-flex justify-sm-center"
              v-for="lecture in lectures"
              :key="lecture.id"
            >
              <LectureCardComponent :lecture="lecture"/>
            </v-col>
            <v-col col="2">
              <v-btn @click="limit = null" v-if="lectures > 10">Show More</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </template>
  </LecturesMetadata>
</template>

<script>
import LectureService from "@/services/LectureService.js";
import LectureCardComponent from '@/components/Card-Lecture'
import LectureCardCreateComponent from '@/components/Card-Lecture-Create'
import LecturesMetadata from "@/views/Lectures/Metadata.vue";
export default {
  components: {
    LecturesMetadata,
    LectureCardComponent,
    LectureCardCreateComponent
  },
  data: () => ({
    card: {
      imageUrl: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      url: '/lectures/create/',
    },
    lectures: null,
    priviliges: false,
    limit: 10
  }),
  computed: {
    lectureLimit: async () => {
      if (this.lectures) {
        return (await this.limit)
          ? this.lectures.slice(0, this.limit)
          : this.lectures;
      }
    }
  },
  mounted() {
    this.getLectures();
    this.checkRoles();
  },
  watch: {
    // call again the method if the route changes
    $route: "getLectures"
  },
  methods: {
    async getLectures() {
      let response = null;
      if (this.$route.params.categoryId) {
        const categoryId = this.$route.params.categoryId;
        response = await LectureService.categories(categoryId);
        if (response.data.length > 0) {
          this.lectures = response.data;
        } else {
          this.lectures = null;
        }
      } else {
        response = await LectureService.index();
        this.lectures = response.data;
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
        this.priviliges = true;
      }
    }
  }
};
</script>

<style>
.greeting-title {
  font-weight: 800;
  font-size: 24px;
  padding: 10px;
  display: block;
}
.greeting-name {
  background-color: #c2f0fc;
}
.invisible {
  color: rgb(63, 114, 175, 0) !important;
}
.show-btns {
  color: rgb(255, 255, 255, 1) !important;
}
</style>