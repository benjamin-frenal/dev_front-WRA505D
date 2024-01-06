<template>
  <main>
    <div class="content--top">
      <div class="flex">
        <h1>Catégories</h1>
      </div>
    </div>
    <div class="list-categories">
      <div class="bloc-categories">
        <a :href="'categorie/' + category.id" class="bloc-categorie" v-for="category in data" :key="category.id">
          {{ category.name }}
        </a>
      </div>
    </div>

  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

let data = ref('')

onMounted(async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token){
      this.$router.push('/');
      return;
    }

    const response = await axios.get('https://127.0.0.1:8000/api/categories', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }
    })

    data.value = response.data
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
})
</script>