<template>
  <main v-if="category">
    <div class="content--top">
      <div class="flex">
        <h1>{{ category.name }}</h1>
      </div>
    </div>
    <section class="list-film">
      <div class="container-movies">
        <div class="movies">
          <div class="contour" v-for="movie in category.movies" :key="movie['@id']">
            <div class="div" style="color: white">
              <router-link :to="'/movie/' + movie.id" class="movie-bloc">
                <img :src="`${apiBaseUrl}/media/${movie.miniature.filePath}`" :alt="movie.title">
              </router-link>
            </div>
            <div class="texte">
              <p>{{movie.title}}</p>
              <p class="description">{{movie.description}}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <div v-else>
    Chargement...
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

let category = ref(null)

const router = useRouter()

onMounted(async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token){
      router.push('/');
      return;
    }

    const categoryId = router.currentRoute.value.params.id;

    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/categories/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }
    })

    category.value = response.data
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching category:', error)
  }
})
</script>
<style scoped>
  *{
    color: white;
  }
</style>