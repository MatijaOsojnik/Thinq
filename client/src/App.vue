<template>
<v-app>
  <div id="app">
    <main>
      <UserHeader/>
      <router-view></router-view>
    </main>
    <Footer/>
  </div>
</v-app>
</template>
<script>
import UserHeader from '@/components/Header/User-Header'
import Footer from '@/components/Footer/Footer'
export default {
  name: "App",

  components: {UserHeader, Footer},

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
