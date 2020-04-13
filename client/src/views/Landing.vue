<template>
  <div>
    <div class="header">
      <v-app-bar flat color="transparent" style="position: absolute;">
        <v-toolbar-title class="brand">Thinq</v-toolbar-title>
        <v-spacer></v-spacer>
        <RegisterComponent />
      </v-app-bar>

      <v-container class="text-center" fill-height fluid>
        <v-row align="center" justify="center">
          <v-col cols=12>
        <h1 class="display-3 white--text ma-6">Become Fluent In German Today.</h1>

          </v-col>
          <v-col cols=12>
            <v-hover
        v-slot:default="{ hover }"
      >
            <v-btn large :class="`${hover ? 'cta-btn-hover' : 'cta-btn-active'}`">
              Get Started
            </v-btn>
            </v-hover>
          </v-col>



        </v-row>
      </v-container>
    </div>

    <v-container fluid>
      <h3 class="display-1 text-center pa-4">Try Our Lectures</h3>
      <v-slide-group>
        <v-slide-item v-for="(item, key) in cardContent" :key="key">
          <CardContentComponent :title="item.title" :imageUrl="item.imageUrl"></CardContentComponent>
        </v-slide-item>
      </v-slide-group>
    </v-container>
  </div>
</template>

<script>
import RegisterComponent from "@/components/Register/Register-Component";
import CardContentComponent from "@/components/Card-Content/Card-Content-Component";
export default {
  components: {
    RegisterComponent,
    CardContentComponent
  },
  data: () => ({
    items: [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" }
    ],
    cardContent: [
      { title: "Traveling", imageUrl: "traveling.jpg" },
      { title: "Coffee Shop", imageUrl: "traveling.jpg" },
      { title: "House Essentials", imageUrl: "traveling.jpg" },
      { title: "first", imageUrl: "traveling.jpg" },
      { title: "second", imageUrl: "traveling.jpg" },
      { title: "third", imageUrl: "traveling.jpg" }
    ]
  })
};
</script>

<style scoped>
.header {
  height: 100vh;
  background: url("../assets/background.jpg") no-repeat center center fixed;
  background-size: cover;
  overflow: hidden;
}
.brand {
  color: white;
  font-weight: 900;
  font-size: 1.5rem;
}
.cta-btn-active {
  background-color: #3f72af !important;
  color: white !important;
  transition: 0.2s;
}
.cta-btn-hover {
  background-color: white !important;
  color: black !important;
  transition: 0.2s;
}
</style>