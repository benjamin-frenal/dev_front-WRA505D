<template>
  <main>
    <div class="content--top">
      <div class="flex">
        <h1>Acteurs</h1>
      </div>
    </div>
    <section class="list-acteurs">
      <div class="container-movies">
        <div v-for="actor in data" :key="index">
          <p>{{ actor.firstName }} {{ actor.lastName }}</p>
        </div>
      </div>
    </section>
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
