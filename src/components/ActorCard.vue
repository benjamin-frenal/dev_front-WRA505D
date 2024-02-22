<template>
    <router-link :to="'actor/' + actor.id" class="bloc-categorie">
      <img :src="actor.image" class="image" alt="">
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
