<template>
  <main v-if="author">
    <div class="content--top">
      <div class="flex">
        <h1>{{ author.firstName }} {{ author.lastName }}</h1>
      </div>
    </div>
    <div class="single-acteur">
      <div class="cover">
        <img :src="author.image" alt="">
      </div>
      <div class="films-link">
        <h2>Films associes</h2>
        <div class="films-link-list">
          <div class="container-movies">
            <div class="movies">
              <div class="contour" v-for="movie in author.movies" :key="movie['@id']">
            <div class="div" style="color: white">
              <a :href="'/movie/' + movie.id" class="movie-bloc">
                <img :src="movie.miniature" :alt="movie.title">
              </a>
            </div>
            <div class="texte">
              <p>{{movie.title}}</p>
              <p class="description">{{movie.description}}</p>
            </div>
          </div>
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

let author = ref(null)

const router = useRouter()

onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/')
      return
    }

    const authorId = router.currentRoute.value.params.id

    const response = await axios.get(`https://127.0.0.1:8000/api/authors/${authorId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })

    author.value = response.data
  } catch (error) {
    console.error('Error fetching authors:', error)
  }
})
</script>