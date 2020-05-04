<template>
  <div>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>
<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  })
};
</script>

<style>
a {
  text-decoration: none;
}

.main {
  padding: 0;
  margin: 0;
}

.cta-btn-active {
  background-color: #3f72af !important;
  color: white !important;
  transition: 0.2s;
}
.cta-btn-hover {
  background-color: white !important;
  color: black !important;
  transition: 0.2s;
}
</style>
