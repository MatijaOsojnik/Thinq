<template>
  <div class="posts">
      <span>Posts</span>
      <div v-for="(post,index) in posts" :key="index">
              <h3>{{post.title}}</h3>
              <span>{{post.content}}</span>
      </div>
  </div>

</template>

<script>
import PostsService from '@/services/PostsService'
export default {
    name: 'posts',
    data() {
        return {
            posts: []
        }
    },
    mounted() {
        this.getPosts()
    },
    methods: {
        async getPosts() {
            const response = await PostsService.fetchPosts()
            this.posts = response.data
        }
    }
}
</script>