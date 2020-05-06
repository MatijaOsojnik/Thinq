<template>
  <div id="app">
    <main>
      <UserHeader/>
      <router-view></router-view>
    </main>
  </div>
</template>
<script>
import UserHeader from '@/components/Header/User-Header'
export default {
  name: "App",

  components: {UserHeader},

  data: () => ({
    //
  })
};
</script>

<style>
#app {
  font-family: "Lato", cursive;
}

a {
  text-decoration: none;
}

.main {
  padding: 0;
  margin: 0;
}
</style>
