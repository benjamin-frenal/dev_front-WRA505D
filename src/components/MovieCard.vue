<template>
  <div class="contour">
    <div class="div" style="color: white">
      <router-link :to="'/movie/' + movie.id" class="movie-bloc">
        <img :src="`${apiBaseUrl}/media/${movie.miniature.filePath}`" :alt="movie.title">
      </router-link>
    </div>
    <div class="texte">
      <p>{{ movie.title }}</p>
      <p class="description">{{ movie.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps(['movie']);
const movie = ref(props.movie);
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
</script>

<style scoped>

</style>
