<template>
  <v-app>
    <div>
      <Header />
    </div>
    <div>
      <!-- <div>
        <span class="greeting-title">
          Welcome <span class="greeting-name" v-if="$store.state.user.display_name">{{$store.state.user.display_name}}</span>! Start Your First Class :)
        </span>
      </div>-->
      <div>
        <span class="greeting-title">Welcome! Start Your First Class :)</span>
      </div>
      <v-container>
        <v-row justify="center" align="center" style="z-index: 100">
          <v-col
            class="col-3 col-md-3 col-sm-6 cols-6"
            v-for="lecture in lectures"
            :key="lecture.id"
          >
            <v-hover v-slot:default="{ hover }">
              <router-link :to="{path: `/lectures/${lecture.id}`}" style="text-decoration:none;">
                <v-card max-width="300px" raised :elevation="hover ? 8 : 2">
                  <v-list-item>
                    <v-list-item-avatar color="grey"></v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title class="title">{{lecture.title}}</v-list-item-title>
                      <!-- <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle> -->
                    </v-list-item-content>
                  </v-list-item>

                  <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
                    height="194"
                    class="darker-img"
                  >
                    <v-row class="fill-height flex-column justify-center">
                      <div class="align-self-center">
                        <v-btn :class="{ 'show-btns': hover }" class="invisible" icon>
                          <v-icon
                            :class="{ 'show-btns': hover }"
                            class="invisible"
                            large
                          >{{"mdi-play-circle-outline"}}</v-icon>
                        </v-btn>
                      </div>
                    </v-row>
                  </v-img>

                  <v-card-text>
                    <span style="display: block;">{{lecture.description}}</span>
                    <!-- <span>{{lecture.Category.name}}</span> -->
                  </v-card-text>
                </v-card>
              </router-link>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import Header from "@/components/Header/Header";
import LectureService from "@/services/LectureService.js";
export default {
  components: {
    Header
  },
  data: () => ({
    lectures: null
  }),
  mounted() {
    this.getLectures();
  },
  methods: {
    async getLectures() {
      const response = await LectureService.index();
      this.lectures = response.data;
    }
  }
};
</script>

<style scoped>
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
.darker-img {
  
}
</style>