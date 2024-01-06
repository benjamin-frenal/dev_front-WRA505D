<template>
  <main>
    <div class="content--top">
      <div class="flex">
        <h1>Films</h1>
        <div class="select">À la une <svg aria-hidden="true" aria-label="arrowDown" color="#f9f9f9" role="img" transform="" version="1.1" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" class="sc-bRBYWo kbKmcm"><title></title><path d="M28.35 11.565c.578-.538 1.433-.355 1.81.325.122.21.182.463.182.72 0 .398-.15.786-.437 1.048L18.93 23.827a1.126 1.126 0 0 1-1.555 0L6.432 13.655c-.468-.438-.563-1.198-.25-1.767.377-.681 1.23-.863 1.809-.325l10.164 9.446 10.195-9.445zM17.957 22.776a.31.31 0 0 1 .391 0l-.194-.181-.197.181zM7.436 12.581c-.006.01 0 .053-.027.028a.07.07 0 0 0 .027-.028zm21.5.024z" class="sc-Rmtcm cUjquv"></path></svg></div>
        <form class="search-form" action="http://127.0.0.1:5173/movies" method="get">
          <input type="text" name="title" placeholder="Entrez un titre" v-model="searchQuery">
          <div class="icons">
            <button type="submit" class="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
            <a v-if="searchQuery" href="/movies"><i class="fa-solid fa-xmark"></i></a>
          </div>
        </form>
      </div>
    </div>
    <section class="list-film">
      <div class="container-movies">
        <div class="movies">
          <div class="contour" v-for="movie in movies" :key="movie.id" >
            <div class="div" style="color: white">
              <a :href="'movie/' + movie.id" class="movie-bloc">
                <img :src="movie.image" :alt="movie.title">
              </a>
            </div>
            <div class="options">
              <a @click="toggleDetails(movie.id)"><i class="fa-solid fa-pen"></i></a>
              <a @click="toggleTrash(movie.id)"><i class="fa-solid fa-trash"></i></a>
            </div>
            <div class="texte">
              <p>{{movie.title}}</p>
              <p class="description">{{movie.description}}</p>
            </div>
          </div>
        </div>
      </div>
      <div :class="[{ 'd-none Jmodal-modif': !selectedMovieId }, 'modal_modif']">
        <h2 v-if="selectedMovie">{{ selectedMovie.title }}</h2>
        <form @submit.prevent="updateMovieTitle">
          <div class="form-group">
            <label for="editMovieTitle">Titre du film :</label>
            <input
                type="text"
                class="form-control"
                id="editMovieTitle"
                v-if="selectedMovie"
                v-model="editedMovieTitle"
            />
          </div>
          <button type="submit" class="btn">Valider les modifications</button>
        </form>
        <div class="close" @click="closeModal"><i class="fa-solid fa-xmark"></i></div>
      </div>
    </section>
  </main>
</template>

<style scoped>

</style>

<script setup>
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';

const selectedMovieId = ref(null);
const movies = ref([]);
const selectedMovie = computed(() => movies.value.find(movie => movie.id === selectedMovieId.value));
const editedMovieTitle = ref('');
const searchQuery = ref('');

const toggleDetails = (movieId) => {
  selectedMovieId.value = selectedMovieId.value === movieId ? null : movieId;
  editedMovieTitle.value = selectedMovie.value ? selectedMovie.value.title : '';
};

const getMovies = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/');
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    searchQuery.value = urlParams.get('title') || '';

    const apiParams = {};
    urlParams.forEach((value, key) => {
      apiParams[key] = value;
    });

    const apiUrl = `https://127.0.0.1:8000/api/movies?${new URLSearchParams(apiParams)}`;

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    console.log(response.data);
    movies.value = response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};


const updateMovieTitle = async () => {
  if (selectedMovie.value && editedMovieTitle.value) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        this.$router.push('/');
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/merge-patch+json',
      };
      const updatedMovie = { title: editedMovieTitle.value };

      await axios.patch(
          `https://127.0.0.1:8000/api/movies/${selectedMovie.value.id}`,
          updatedMovie,
          { headers }
      );

      editedMovieTitle.value = '';
      getMovies();
      selectedMovieId.value = null;
    } catch (error) {
      console.error('Error updating movie title:', error);
    }
  }
};

const closeModal = () => {
  selectedMovieId.value = null;
};

onMounted(() => {
  getMovies();
});
</script>