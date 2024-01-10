<template>
  <main>
    <div class="content--top">
      <div class="flex">
        <h1>Acteurs</h1>
      </div>
    </div>
    <div class="list-acteurs">
      <div class="bloc-categories">
        <a :href="'actor/' + actor.id" class="bloc-categorie" v-for="actor in data" :key="actor.id">
          <img :src="actor.image" class="image" alt="">
          <div>{{ actor.firstName }} {{ actor.lastName }}</div>
        </a>
      </div>
    </div>
  </main>
</template>

<style scoped>
</style>

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

    const response = await axios.get('https://127.0.0.1:8000/api/authors', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }
    })
    console.log(response.data)
    data.value = response.data
  } catch (error) {
    console.error('Error fetching authors:', error)
  }
})
</script>
<style scoped>
*{
  color: white;
}
</style>
