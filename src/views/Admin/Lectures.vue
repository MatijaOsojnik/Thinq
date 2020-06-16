<template>
  <v-app>
    <AdminHeader />
    <v-container fluid>
      <span class="d-block title pa-2">LECTURES</span>

      <v-card>
        <v-card-title>
          All Lectures
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
          item-key="id"
          single-expand
          show-expand
        >
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
              <td class="pa-6" :colspan="headers.length">
                <span class="subtitle-2">Description:</span>
                <span v-html="item.description"></span>
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
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style>
</style>