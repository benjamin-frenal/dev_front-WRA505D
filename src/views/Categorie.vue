<template>
  <main v-if="category">
    <div class="content--top">
      <div class="flex">
        <h1>{{ category.name }}</h1>
      </div>
    </div>
    <div class="category-details">
      <h2>Films associés :</h2>
      <ul>
        <li v-for="movie in category.movies" :key="movie['@id']">
          {{ movie.title }}
        </li>
      </ul>
    </div>
  </main>
  <div v-else>
    Chargement...
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

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

    const response = await axios.get(`https://127.0.0.1:8000/api/categories/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }
    })

    category.value = response.data
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