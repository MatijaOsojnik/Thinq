<template>
  <div>
    <Header/>
     <h1 v-if="user">{{user.display_name}}</h1>
  </div>
</template>

<script>
import UserService from '@/services/UserService.js'
import Header from '@/components/Header/Header'
export default {
  components: {
    Header
  },
  data: () => ({
    user: null
  }),
  mounted() {
    this.getUser()
  },
  methods: {
      async getUser() {
      try {
        const userId = this.$route.params.id;
        const response = await UserService.show(userId);
        this.user = response.data;
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

<style>

</style>