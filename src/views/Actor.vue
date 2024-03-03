<template>
  <main v-if="author">
    <div class="content--top">
      <div class="flex">
        <h1>{{ author.firstName }} {{ author.lastName }}</h1>
      </div>
    </div>
    <div class="single-acteur">
      <div class="cover">
        <img :src="`${apiBaseUrl}/media/`+author.image.filePath" alt="">
      </div>
      <div class="films-link">
        <h2>Films associes</h2>
        <div class="films-link-list">
          <div class="container-movies">
            <div class="movies">
              <MovieCard v-for="movie in author.movies" :movie="movie" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <div v-else>
    Chargement...
  </div>
</template>

<style scoped>

</style>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import MovieCard from "@/components/MovieCard.vue";

let author = ref(null)

const router = useRouter()
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/')
      return
    }

    const authorId = router.currentRoute.value.params.id

    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/authors/${authorId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })

    author.value = response.data
    console.log(author.value)
  } catch (error) {
    console.error('Error fetching authors:', error)
  }
})
</script>