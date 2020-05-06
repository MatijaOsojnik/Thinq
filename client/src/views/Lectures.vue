<template>
  <v-app>
    <div>
      <Header />
    </div>
    <div>
      <div>
        <span class="greeting-title">
          Welcome <span class="greeting-name">{{$store.state.user.display_name}}</span>! Start Your First Class :)
        </span>
      </div>
      <v-row>
        <v-col col="4" v-for="lecture in lectures" :key="lecture.id">
            <CardContentComponent />
          <!-- <v-card>
            <v-card-title>{{lecture.title}}</v-card-title>
            <v-card-text>
              <p>{{lecture.description}}</p>
              <strong>{{lecture.Category.name}}</strong>
            </v-card-text>
          </v-card> -->
        </v-col>
      </v-row>
    </div>
  </v-app>
</template>

<script>
import CardContentComponent from "@/components/Card-Content/Card-Content-Component"
import Header from "@/components/Header/Header";
import LectureService from "@/services/LectureService.js";
export default {
  components: {
    Header, CardContentComponent
  },
  data: () => ({
    lectures: null,
        cardContent: [
      [
        { title: "Traveling1", imageUrl: "traveling.jpg" },
        { title: "Traveling2", imageUrl: "traveling.jpg" },
        { title: "Traveling2", imageUrl: "traveling.jpg" },
        { title: "Traveling2", imageUrl: "traveling.jpg" }
      ],
      [
        { title: "Movie1", imageUrl: "traveling.jpg" },
        { title: "Movie2", imageUrl: "traveling.jpg" }
      ],
      [
        { title: "Library1", imageUrl: "traveling.jpg" },
        { title: "Library2", imageUrl: "traveling.jpg" }
      ]
    ]
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
</style>