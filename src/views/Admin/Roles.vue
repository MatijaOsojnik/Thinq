<template>
  <v-app>
    <AdminHeader />
    <v-container fluid>
      <span class="d-block title pa-2">ROLES</span>

      <v-card>
        <v-card-title>
          All Roles
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
import GeneralService from "@/services/GeneralService";
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
        text: "Name",
        align: "start",
        sortable: true,
        value: "name"
      },
      { text: "Description", value: "description" },
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
    this.getRoles();
  },
  methods: {
    async getRoles() {
      try {
        const response = await GeneralService.getRoles();
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