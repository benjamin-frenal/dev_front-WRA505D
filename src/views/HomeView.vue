<template>
  <main>
    <h1>Bienvenue sur mon Projet Application "Movies" - Benjamin Frenal S5 F</h1>
    <section class="home-categorie">
      <div class="bloc-categories">
        <router-link :to="'categorie/' + category.id" class="bloc-categorie" v-for="category in categories" :key="category.id">
          {{ category.name }}
        </router-link>
      </div>
    </section>
    <section class="quatre-films">
      <h2>Nos quatre derniers films</h2>
      <div class="container-movies">
        <div class="movies">
          <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
        </div>
      </div>
    </section>
    <section class="quatre-acteurs">
      <h2>Nos quatre derniers acteurs</h2>
      <div class="list-acteurs">
        <div class="bloc-categories">
          <ActorCard v-for="actor in actors" :key="actor.id" :actor="actor" />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
  *{
    color: white;
  }
  h1{
    text-align: center;
    margin: 172px 50px 100px;
  }
  .list-acteurs{
    margin-top: 20px;
    padding: 0!important;
  }
  @media screen and (max-width: 1400px){
    body #app .home-categorie .bloc-categories, body #app .quatre-films .container-movies .movies{
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      .bloc-categorie{
        padding: 0;
      }
    }
  }
  @media screen and (max-width: 991px){
    body #app .home-categorie .bloc-categories, body #app .quatre-films .container-movies .movies{
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media screen and (max-width: 767px){
    body #app .home-categorie .bloc-categories, body #app .quatre-films .container-movies .movies{
      grid-template-columns: 1fr;
    }
  }
  @media screen and (max-width: 500px){
    h1{
      margin: 172px 0 50px;
      font-size: 24px;
    }
    body #app .home-categorie {
      margin: 40px;
    }
  }
</style>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import MovieCard from '@/components/MovieCard.vue';
import ActorCard from '@/components/ActorCard.vue';

let categories = ref([]);
let movies = ref([]);
let actors = ref([]);

onMounted(async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token){
      this.$router.push('/');
      return;
    }

    const categoriesResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }
    })
    categories.value = categoriesResponse.data.slice(0, 6); // Pour afficher que les 6 premières catégories

    const actorsResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/authors`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }
    })
    actors.value = actorsResponse.data.slice(-4);

    const moviesResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/movies`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }
    })
    movies.value = moviesResponse.data.slice(-4);

  } catch (error) {
    console.error('Error fetching data:', error)
  }
})
</script>