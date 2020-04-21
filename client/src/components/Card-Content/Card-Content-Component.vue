<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col class="col-3 col-md-3 col-sm-6 cols-6" align="center" v-for="(card,key) in cardContent" :key="key">
        <v-card class="transparent" max-width="250">
          <v-img height="170" :src="require(`../../assets/${card.imageUrl}`)"></v-img>
          <span class="card-title">{{card.title}}</span>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    cardContent: Array
  }
};
</script>

<style scoped>
.card-title {
  display: block;
  font-weight: 500;
  font-size: 18px;
  text-align: center;
  padding: 8px;
}
</style>