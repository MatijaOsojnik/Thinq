<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      :to="{path: `/lectures/${lecture.id}`}"
      width="300px"
      height="320px"
      raised
      :elevation="hover ? 8 : 2"
    >
      <div>
        <v-list-item>
          <router-link
            v-if="lecture.Users[0]"
            :to="{path: `/users/${lecture.Users[0].display_name}/${lecture.Users[0].id}/profile`}"
          >
            <v-list-item-avatar>
              <v-img
                v-if="lecture.Users.length > 0 && lecture.Users[0].icon_url"
                :src="lecture.Users[0].icon_url"
              ></v-img>
              <v-icon v-else dark large color="indigo">mdi-account-circle</v-icon>
            </v-list-item-avatar>
          </router-link>
          <v-list-item-content>
            <v-list-item-title class="title">{{lecture.title}}</v-list-item-title>
            <v-list-item-subtitle v-if="lecture.Users[0]">
              By
              <span class="font-weight-bold">{{lecture.Users[0].display_name}}</span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-img
          :src="lecture.thumbnail_url"
          height="175"
          lazy-src="@/assets/blue-error-background.jpg"
          class="darker-img"
        >
          <v-row class="fill-height flex-column justify-center">
            <div class="align-self-center">
              <v-btn :class="{ 'show-btns': hover }" class="invisible" icon>
                <v-icon
                  :class="{ 'show-btns': hover }"
                  class="invisible"
                  large
                >{{"mdi-play-circle-outline"}}</v-icon>
              </v-btn>
            </div>
          </v-row>
        </v-img>

        <v-card-text>
          <span style="display: block;">{{lecture.short_description}}</span>
          <!-- <span>{{lecture.Category.name}}</span> -->
        </v-card-text>
      </div>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    lecture: Object
  }
};
</script>

<style>
</style>