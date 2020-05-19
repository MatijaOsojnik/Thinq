<template>
  <v-app>
    <v-layout>
      <v-flex xs12 justify="center" align="center">
        <v-card class="ma-12 mx-auto" max-width="1000px">
          <v-toolbar>
            <v-toolbar-title>Create A New Lecture</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-scroll-x-transition>
              <v-alert type="warning" mode="out-in" v-if="error">{{error}}</v-alert>
            </v-scroll-x-transition>
            <v-form lazy-validation>
              <v-text-field
                label="Title"
                max-length="25"
                solo
                aria-autocomplete="false"
                v-model="lecture.title"
              />

              <v-text-field
                :rules="[rules.short_description]"
                label="Short Description"
                solo
                clearable
                counter
                maxlength="80"
                hint="This description will be used on the Lecture card before the user clicks on it."
                aria-autocomplete="false"
                v-model="lecture.short_description"
              />

              <div style="margin: 0.5rem 0 2rem">
                <tiptap-vuetify v-model="lecture.description" :extensions="extensions" />
              </div>

              <v-text-field
                label="Thumbnail URL"
                solo
                aria-autocomplete="false"
                v-model="lecture.thumbnail_url"
              />

              <!-- <v-file-input
              :rules="rules"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick a thumbnail"
              prepend-icon="mdi-camera"
              label="Avatar"
              solo
              ></v-file-input>-->

              <v-select
                :items="categories"
                label="Category"
                v-model="lecture.category_id"
                item-text="name"
                item-value="id"
                solo
              ></v-select>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn block @click="updateLecture">CREATE</v-btn>
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
  Link,
  HardBreak,
  History
} from "tiptap-vuetify";

export default {
  components: {
    TiptapVuetify
  },

  data: () => ({
    rules: {
      short_description: text => text.length <= 80 || "Max 80 characters",
      file: value =>
        !value ||
        value.size < 2000000 ||
        "Thumbnail size should be less than 2 MB!",
      required: value => !!value || "Required."
    },
    lecture: {
      title: ``,
      short_description: ``,
      description: `<p>Write your description here.</p>`,
      thumbnail_url: ``,
      category_id: ``,
      user_id: null
    },
    error: null,
    categories: [],
    extensions: [
      History,
        Bold,
      Italic,
      Link,
      ListItem,
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
    this.getLecture();
    this.findCategories();
    this.lecture.user_id = this.$route.params.id;
  },
  methods: {
    async updateLecture() {
      this.error = null;
      const areAllFieldsFilledIn = Object.keys(this.lecture).every(
        key => !!this.lecture[key]
      );
      if (!areAllFieldsFilledIn) {
        this.error = "Please fill in all the fields.";
        setTimeout(() => (this.error = null), 3000);
        return;
      }
      try {
        const lectureId = this.$route.params.id;
        await LectureService.put(this.lecture);
        this.$router.push({
          name: "lecture",
          params: {
              id: lectureId
          }
        });
      } catch (err) {
        console.log(err);
      }
    },
    async findCategories() {
      const response = await CategoryService.index();

      response.data.map(category => {
        this.categories.push({ name: category.name, id: category.id });
      });
    },
    async getLecture() {
      const lectureId = this.$route.params.id;
      const response = await LectureService.show(lectureId);
      this.lecture = response.data;
    }
  }
};
</script>

<style>
</style>