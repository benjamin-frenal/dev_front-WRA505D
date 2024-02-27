<template>
    <router-link :to="'actor/' + actor.id" class="bloc-categorie">
      <img :src="'https://127.0.0.1:8000/media/'+actor.image.filePath" class="image" alt="">
      <p>{{ actor.firstName }} {{ actor.lastName }}</p>
    </router-link>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps(['actor']);
const actor = ref(props.actor);
</script>

<style scoped>

</style>
