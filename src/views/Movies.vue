<template>
  <main>
    <div class="content--top">
      <div class="flex">
        <h1>Films</h1>
        <form  class="select" action="">
          <select name="categories" id="categories">
            <option value="default">Tous les films</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </form>
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
                <img :src="movie.miniature" :alt="movie.title">
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

let categories = ref('')
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


    const categoriesresponse = await axios.get('https://127.0.0.1:8000/api/categories', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }
    })

    categories.value = categoriesresponse.data

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