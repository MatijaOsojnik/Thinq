<template>
  <div>
     <h1>{{user.display_name}}</h1>
  </div>
</template>

<script>
export default {
  data: () => ({
    user: null
  }),
  mounted() {
    this.user = this.$store.state.user
  }
}
</script>

<style>

</style>