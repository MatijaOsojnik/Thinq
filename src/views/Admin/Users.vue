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
        >
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import UserService from "@/services/UserService";
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
        text: "Display Name",
        align: "start",
        sortable: false,
        value: "display_name"
      },
      { text: "Email", value: "email" },
      { text: "Lecturer", value: "isLecturer" }
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
    this.getUsers();
  },
  methods: {
    async getUsers() {
      try {
        const response = await UserService.index();
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