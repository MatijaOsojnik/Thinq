<template>
  <v-app>
    <div class="header">
      <v-app-bar flat color="transparent" style="position: absolute;">
        <v-toolbar-title class="brand">Thinq</v-toolbar-title>
        <v-spacer></v-spacer>
        <RegisterComponent />
      </v-app-bar>

      <v-container class="text-center" fill-height fluid>
        <v-row align="center" justify="center">
          <v-col cols="12">
            <h1 class="display-3 white--text ma-6">Become Fluent In Slovenian Today.</h1>
          </v-col>
          <v-col cols="12">
            <v-hover v-slot:default="{ hover }">
              <v-btn large :class="`${hover ? 'cta-btn-hover' : 'cta-btn-active'}`">Get Started</v-btn>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div class="content-container">
      <v-container fluid class="pa-12">
        <!-- <h3
          class="display-1 text-center pa-6"
          style="font-weight:bold; margin-top: 2rem;"
        >Find What Fascinates You</h3>-->

        <!-- <template v-slots:extension>
          <div style="width:60%; margin:auto;" class="pa-6">
            <v-tabs v-model="tab" height="40px" grow class="tab">
              <v-tab v-for="(item, key) in tabItems" :key="key">{{ item }}</v-tab>
            </v-tabs>
          </div>
        </template>

        <v-container class="pa-6">
          <v-tabs-items v-model="tab" class="transparent">
            <v-tab-item v-for="(item, key) in tabItems" :key="key">
              <CardContentComponent v-if="key===0" :cardContent="cardContent[0]"></CardContentComponent>
              <CardContentComponent v-if="key===1" :cardContent="cardContent[1]"></CardContentComponent>
              <CardContentComponent v-if="key===2" :cardContent="cardContent[2]"></CardContentComponent>
            </v-tab-item>
          </v-tabs-items>
        </v-container>-->
        <v-container class="header-container">
          <v-row class="pa-6 align-center justify-center">
            <v-col cols="6">
              <div class="header-content-container">
                <div>
                  <span class="header-content-title">FRIENDLY UI</span>
                </div>
                <div>
                  <span class="header-content-text">
                    We know how hard it is to learn a language when there is not many helpful sources around. Learn about the Slovenian culture while expanding your linguistic skills -
                    <strong>all on a single platform.</strong> We'll make sure to give you the best experience possible for free.
                  </span>
                </div>
              </div>
            </v-col>
            <v-col cols="6" class="d-flex justify-end">
              <img class="header-content-image" src="../assets/to-the-moon.svg" />
            </v-col>
          </v-row>
          <v-row class="pa-6 align-center justify-center">
            <v-col cols="6" class="d-flex justify-start">
              <img class="header-content-image" src="../assets/productivity.svg" />
            </v-col>
            <v-col cols="6">
              <div class="header-content-container">
                <div>
                  <span class="header-content-title">15 Minutes a Day</span>
                </div>
                <div>
                  <span class="header-content-text">
                    15 minutes a day, keeps the knowledge at bay. Right? That's what doctors say..and Mr. Warren Buffet with his famous quote "Knowledge stacks up. Just like compound interest".
                  </span>
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row class="pa-6 align-center justify-center">
            <v-col cols="6">
              <div class="header-content-container">
                <div>
                  <span class="header-content-title">Collaborate With Us</span>
                </div>
                <div>
                  <span class="header-content-text">
                    Nobody knows everything and because of that we want you to help us make learning Slovenian the best possible experience. If you have any tips or just anything you think we could improve, share your insights in our <a href="#insights">INSIGHTS</a> section. 
                  </span>
                </div>
              </div>
            </v-col>
            <v-col cols="6" class="d-flex justify-end">
              <img class="header-content-image" src="../assets/collaborate.svg" />
            </v-col>
          </v-row>
        </v-container>
      </v-container>
      <!-- <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style="width:100%;height:14rem;display:block;margin-top:-3rem;"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#576b75"
          fill-opacity="1"
          d="M0,128L80,154.7C160,181,320,235,480,240C640,245,800,203,960,186.7C1120,171,1280,181,1360,186.7L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        />
      </svg>-->
    </div>
    <v-container fluid class="recommended-container">
        <h3
          class="display-1 text-center pa-6"
          style="font-weight:bold; margin-top: 2rem;"
        >Find What Fascinates You</h3>

        <template v-slots:extension>
          <div style="width:60%; margin:auto;" class="pa-6">
            <v-tabs v-model="tab" height="40px" grow class="tab">
              <v-tab v-for="(item, key) in tabItems" :key="key">{{ item }}</v-tab>
            </v-tabs>
          </div>
        </template>

        <v-container class="pa-12">
          <v-tabs-items v-model="tab" class="transparent">
            <v-tab-item v-for="(item, key) in tabItems" :key="key">
              <CardContentComponent v-if="key===0" :cardContent="cardContent[0]"></CardContentComponent>
              <CardContentComponent v-if="key===1" :cardContent="cardContent[1]"></CardContentComponent>
              <CardContentComponent v-if="key===2" :cardContent="cardContent[2]"></CardContentComponent>
            </v-tab-item>
          </v-tabs-items>
        </v-container>
    </v-container>
    <v-container class="cta-container"> 

    </v-container>
    <Footer></Footer>
  </v-app>
</template>

<script>
import RegisterComponent from "@/components/Register/Register-Component";
import CardContentComponent from "@/components/Card-Content/Card-Content-Component";
import Footer from "@/components/Footer/Footer";
export default {
  components: {
    RegisterComponent,
    CardContentComponent,
    Footer,
  },
  data: () => ({
    tab: null,
    tabItems: ["Traveling", "Movies", "Library"],
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
  })
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.header {
  height: 100vh;
  background: url("../assets/background.jpg") no-repeat center center fixed;
  background-size: cover;
  overflow: hidden;
  position: relative;
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
.header-container {
  /* background-color: #65587f; */
  border-radius: 10px;
  margin: 1rem auto;
  width: 80%;
}
.header-content-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.header-content-image {
  width: 70%;
}
.header-content-title {
  font-family: "Patrick Hand SC", cursive;
  font-size: 35px;
}
.header-content-text {
  font-family: "Lato";
  font-weight: 300;
}
.content-container {
  background-color: #ededed;
  position: relative;
}
.tab {
  margin: 0 2px 15px;
  background-color: #ffffff;
}

.recommended-container {
  background-color: #ffffff;
  margin: 2rem auto;
}
.cta-container {
  background-color: #ededed;
}
</style>