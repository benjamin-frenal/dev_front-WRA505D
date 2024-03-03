<template>
    <router-link :to="'actor/' + actor.id" class="bloc-categorie">
      <img :src="`${apiBaseUrl}/media/${actor.image.filePath}`" class="image" alt="">
      <p>{{ actor.firstName }} {{ actor.lastName }}</p>
    </router-link>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps(['actor']);
const actor = ref(props.actor);
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

</script>

<style scoped>

</style>
