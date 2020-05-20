<template>
  <div>
    <div>
      <Header />
    </div>
    <div>
      <!-- <div>
        <span class="greeting-title">
          Welcome <span class="greeting-name" v-if="$store.state.user.display_name">{{$store.state.user.display_name}}</span>! Start Your First Class :)
        </span>
      </div>-->
      <!-- <div>
        <span class="greeting-title">Welcome! Start Your First Class :)</span>
      </div> -->
      <v-container fluid>
        <v-row style="z-index: 100">
          <v-col v-if="$store.state.isUserLoggedIn" class="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-6">
            <v-hover v-slot:default="{ hover }">
              <router-link :to="{path: `/lectures/create/1`}" style="text-decoration:none;">
                <v-card max-width="300px" height="320px" raised img="https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" :elevation="hover ? 8 : 2">
                  <v-row class="fill-height flex-column justify-center">
                    <div class="align-self-center">
                      <v-btn icon :class="{ 'show-btns': hover }" class="invisible">
                        <v-icon x-large :class="{ 'show-btns': hover }" class="invisible">{{"mdi-plus-circle-outline"}}</v-icon>
                      </v-btn>
                    </div>
                  </v-row>
                </v-card>
              </router-link>
            </v-hover>
          </v-col>
          <v-col
            class="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-6"
            v-for="lecture in lectures"
            :key="lecture.id"
          >
            <v-hover v-slot:default="{ hover }">
              <router-link :to="{path: `/lectures/${lecture.id}`}" style="text-decoration:none;">
                <v-card max-width="300px" height="320px" raised :elevation="hover ? 8 : 2">
                  <v-list-item>
                    <v-list-item-avatar color="indigo"><v-icon dark>mdi-account-circle</v-icon></v-list-item-avatar>
                    <!-- <v-list-item-avatar v-else :img="$store.state.user.icon_url"></v-list-item-avatar> -->
                    <v-list-item-content>
                      <v-list-item-title class="title">{{lecture.title}}</v-list-item-title>
                      <!-- <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle> -->
                    </v-list-item-content>
                  </v-list-item>

                  <v-img :src="lecture.thumbnail_url" height="194" class="darker-img">
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
                    <span style="display: block;">{{lecture.short_description}}</span>
                    <!-- <span>{{lecture.Category.name}}</span> -->
                  </v-card-text>
                </v-card>
              </router-link>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
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