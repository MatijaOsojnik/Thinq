<template>
  <div>
    <v-app-bar flat color="transparent">
      <v-toolbar-title>Thinq</v-toolbar-title>
      <v-spacer></v-spacer>
      <RegisterComponent/>
    </v-app-bar>
  </div>
</template>

<script>
import RegisterComponent from "@/components/Register-Component"
export default {
    components: {
        RegisterComponent,
    },
  data: () => ({
    items: [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" }
    ]
  })
};
</script>

<style>
</style>