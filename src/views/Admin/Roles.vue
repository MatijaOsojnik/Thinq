<template>
  <v-app>
    <AdminHeader />
    <v-container fluid>
      <span class="d-block title pa-2">ROLES</span>
    </v-container>
  </v-app>
</template>

<script>
import GeneralService from "@/services/GeneralService";
import AdminHeader from '@/components/Header/Admin-Header.vue'

export default {
    components: {
        AdminHeader
    },
  created() {
    this.countEntities();
  },
  methods: {
    async countEntities() {
      try {
        const response = await GeneralService.count();
        this.statistics = response.data;
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