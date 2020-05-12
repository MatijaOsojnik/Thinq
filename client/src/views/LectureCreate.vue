<template>
  <v-app>
    <v-layout>
      <v-flex xs12 justify="center" align="center">
        <v-card class="ma-12 mx-auto" max-width="400px">
          <v-toolbar>
            <v-toolbar-title>Create A New Lecture</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field label="Title" v-model="lecture.title"></v-text-field>
            <v-textarea label="Description" counter auto-grow clearable :rules="rules" v-model="lecture.description"></v-textarea>
            <v-select :items="categories" label="Category" v-model="lecture.category_id" item-text="name" item-value="id"></v-select>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="createLecture">
              CREATE
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import LectureService from "@/services/LectureService";
import CategoryService from "@/services/CategoryService";

export default {
  data: () => ({
    rules: [text => text.length <= 255 || 'Max 255 characters'],
    lecture: {
      title: "",
      description: "",
      category_id: "",
      user_id: null
    },
    categories: [],
  }),
  mounted() {
    this.findCategories();
    this.lecture.user_id = this.$route.params.id
  },
  methods: {
    async createLecture() {
      await LectureService.postLecture(this.lecture);
    },
    async findCategories() {
      const response = await CategoryService.index();

      response.data.map(category => {
        this.categories.push({name: category.name, id: category.id});
      });
    }
  }
};
</script>

<style>
</style>