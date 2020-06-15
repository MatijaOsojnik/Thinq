<template>
  <v-app>
    <v-layout>
      <v-flex xs12 justify="center" align="center">
        <v-card class="ma-12 mx-auto" max-width="1000px">
          <v-toolbar flat color="#617BE3" dark>
            <v-toolbar-title>Create A New Lecture</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-scroll-x-transition>
              <v-alert elevation="2" type="warning" v-if="errors.length">
                <ul>
                  <li v-for="error in errors" :key="error">{{ error }}</li>
                </ul>
              </v-alert>
            </v-scroll-x-transition>
            <v-form lazy-validation>
              <label for="title">Title</label>
              <v-text-field
                id="title"
                label="Enter a title for your lecture"
                maxlength="30"
                :rules="[rules.min]"
                counter
                solo
                aria-autocomplete="false"
                v-model="lecture.title"
              />

              <label for="shortDescription">Short Description</label>
              <v-text-field
                id="shortDescription"
                :rules="[rules.short_description]"
                label="Write your short description here"
                solo
                clearable
                counter
                maxlength="60"
                hint="This description will be used on the Lecture card before the user clicks on it."
                aria-autocomplete="false"
                v-model="lecture.short_description"
              />
              <label for="description">Description</label>
              <div style="margin: 0.5rem 0 2rem">
                <tiptap-vuetify
                  id="description"
                  v-model="lecture.description"
                  :rules="[rules.description]"
                  placeholder="Write your description here."
                  maxlength="300"
                  :extensions="extensions"
                />
              </div>

              <label for="thumbnailURL">Thumbnail URL</label>
              <v-text-field
                id="thumbnailURL"
                label="Enter Thumbnail URL"
                solo
                aria-autocomplete="false"
                v-model="lecture.thumbnail_url"
              />

              <label for="category">Category</label>
              <v-select
                id="category"
                :items="categories"
                label="Select Category"
                v-model="lecture.category_id"
                item-text="name"
                item-value="id"
                solo
              ></v-select>
            </v-form>
            <v-scroll-x-transition>
              <v-alert type="success" mode="out-in" v-if="successfulLecturePost">
                <span>You successfuly posted a lecture</span>
              </v-alert>
            </v-scroll-x-transition>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="#f0f0f0"
              :disabled="waitBeforeClick"
              block
              large
              @click="createLecture"
            >CREATE</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import LectureService from "@/services/LectureService";
import CategoryService from "@/services/CategoryService";
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  HardBreak,
  History,
  Link
} from "tiptap-vuetify";

export default {
  components: {
    TiptapVuetify
  },

  data: () => ({
    rules: {
      short_description: text => text.length <= 60 || "Max 60 characters",
      description: text => text.length <= 300 || "Max 300 characters",
      file: value =>
        !value ||
        value.size < 2000000 ||
        "Thumbnail size should be less than 2 MB!",
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters"
    },
    lecture: {
      title: ``,
      short_description: ``,
      description: ``,
      thumbnail_url: ``,
      category_id: ``
    },
    waitBeforeClick: false,
    successfulLecturePost: false,
    errors: [],
    categories: [],
    extensions: [
      History,
      Bold,
      Italic,
      ListItem,
      Link,
      BulletList,
      OrderedList,
      [
        Heading,
        {
          options: {
            levels: [1, 2, 3]
          }
        }
      ],
      Paragraph,
      HardBreak
    ]
  }),
  mounted() {
    this.findCategories();
    this.checkUser();
  },
  methods: {
    async createLecture() {
      this.waitBeforeClick = true;
      const areAllFieldsFilledIn = Object.keys(this.lecture).every(
        key => !!this.lecture[key]
      );
      if (!areAllFieldsFilledIn) {
        this.errors.push("Please fill in all the fields.");
        setTimeout(() => {
          this.errors = [];
          this.waitBeforeClick = false;
        }, 3000);
        return;
      }
      try {
        const userId = this.$route.params.id;
        const response = await LectureService.post(this.lecture, userId);
        if (response) {
          this.successfulLecturePost = true;
          setTimeout(() => {
            this.successfulLecturePost = false;
            this.waitBeforeClick = false;
            this.$router.push({
              name: "lectures"
            });
          }, 3000);
        }
      } catch (err) {
        this.errors = err.response.data;
        setTimeout(() => (this.waitBeforeClick = false), 3000);
        setTimeout(() => (this.errors = []), 5000);
      }
    },
    async findCategories() {
      const response = await CategoryService.index();

      response.data.map(category => {
        this.categories.push({ name: category.name, id: category.id });
      });
    },
    checkUser() {
      if (this.$store.state.user) {
        if (this.$route.params.id != this.$store.state.user.id) {
          this.$router.push({
            name: "lectures"
          });
        }
      }
    }
  }
};
</script>

<style>
</style>