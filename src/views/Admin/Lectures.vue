<template>
  <v-app>
    <AdminHeader />
    <v-container fluid>
      <span class="d-block title pa-2">USERS</span>

      <v-card>
        <v-card-title>
          All Users
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          v-if="!loading"
          :loading="loading"
          loading-text="Loading... Please wait"
          :headers="headers"
          :items="statistics"
          :search="search"
          class="elevation-1"
          single-expand
          item-key="description"
          show-expand
        >
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
          <template v-slot:expanded-item="{ headers, item }">

              <td class="pa-6" :colspan="header.length">
                <span class="title">Short Description:</span>
                <span>{{ item.short_description }}</span>
              </td>
              <td class="pa-6">
                <span class="title">Description:</span>
                <span>{{ item.description }}</span>
              </td>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import LectureService from "@/services/LectureService";
import AdminHeader from "@/components/Header/Admin-Header.vue";

export default {
  components: {
    AdminHeader
  },
  data: () => ({
    statistics: null,
    loading: true,
    search: "",
    headers: [
      {
        text: "ID",
        value: "id"
      },
      {
        text: "Title",
        align: "start",
        sortable: true,
        value: "title"
      },
      { text: "Creator ID", value: "Users[0].id" },
      { text: "Category", value: "Category.name" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    }
  }),
  created() {
    this.getLectures();
  },
  methods: {
    async getLectures() {
      try {
        const response = await LectureService.index();
        this.statistics = response.data;
        this.loading = false;
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style>
</style>