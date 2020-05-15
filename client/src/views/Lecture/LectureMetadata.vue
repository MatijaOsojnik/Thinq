<template>
  <v-container style="height: 100vh;">
    <router-link :to="{name: 'lectures'}" class="back-link" style="margin-top: 20px;">
      <v-icon dense>mdi-chevron-left</v-icon>Back to all lectures
    </router-link>
    <v-row>
      <v-col class="col-xl-8 col-lg-8 col-md-7 col-sm-12 cols-12">
        <h1 class="display-3">{{lecture.title}}</h1>
        <div class="d-flex flex-column justify-space-around">
          <div>
            <div v-html="lecture.description"></div>
          </div>
        </div>
      </v-col>
      <v-col class="col-xl-4 col-lg-4 col-md-5 col-sm-12 cols-12">
        <v-card max-width="350px" max-height="400px">
          <v-img :src="lecture.thumbnail_url" height="250px"></v-img>
          <v-card-text>
            <div class="d-flex justify-space-around align-center">
              <span class="lecture-count">Exercises</span>
              <span class="lecture-count">Lectures</span>
            </div>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-hover v-slot:default="{ hover }">
              <router-link :to="{name: 'lectureAction'}">
                <v-btn
                  :class="`${hover ? 'cta-btn-hover' : 'cta-btn-active'}`"
                >Get Started</v-btn>
              </router-link>
            </v-hover>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
      lecture: Object
  }
}
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