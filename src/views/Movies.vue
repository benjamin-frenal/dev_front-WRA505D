<template>
  <main>
    <div class="content--top">
      <div class="flex">
        <h1>Films</h1>
        <form  class="select" action="">
          <select name="categories" id="categories" @change="updateCategory($event.target.value)">
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
          <div v-if="selectedCategoryId !== 'default'" class="contour" v-for="movie in movies.movies" :key="movie['@id']">
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
          <div v-else class="contour" v-for="movie in movies" :key="movie['@id']">
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
        <form class="modal_form" @submit.prevent="updateMovieDetails">
          <div class="form-group form-group-pen">
            <label for="editMovieTitle">Titre du film :</label>
            <input
                type="text"
                class="form-control"
                id="editMovieTitle"
                v-if="selectedMovie"
                v-model="editedMovieTitle"
            />
          </div>
          <div class="form-group form-group-pen">
            <label for="editMovieDescription">Description du film :</label>
            <textarea
                class="form-control"
                id="editMovieDescription"
                v-if="selectedMovie"
                v-model="editedMovieDescription"
            ></textarea>
          </div>
          <div class="grid-group">
            <div class="form-group">
              <label for="editMovieDuration">Durée du film (en minutes) :</label>
              <input
                  type="number"
                  class="form-control"
                  id="editMovieDuration"
                  v-if="selectedMovie"
                  v-model="editedMovieDuration"
              />
            </div>
            <div class="form-group">
              <label for="editMovieReleaseDate">Date de sortie :</label>
              <input
                  type="date"
                  class="form-control"
                  id="editMovieReleaseDate"
                  v-if="selectedMovie"
                  v-model="editedMovieReleaseDate"
              />
            </div>
            <div class="form-group">
              <label for="editMovieCategory">Catégorie du film :</label>
              <select
                  class="form-control"
                  id="editMovieCategory"
                  v-if="selectedMovie"
                  v-model="editedMovieCategory"
              >
                <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="editMovieActors">Acteurs du film :</label>
              <select
                  class="form-control"
                  id="editMovieActors"
                  v-if="selectedMovie"
                  v-model="editedMovieActors"
                  multiple
              >
                <option
                    v-for="actor in actors"
                    :key="actor.id"
                    :value="actor.id"
                >
                  {{ actor.firstName }} {{ actor.lastName }}
                </option>
              </select>
            </div>
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
let actors = ref('')
const selectedCategoryId = ref('default');
const selectedMovieId = ref(null);
const movies = ref([]);
const selectedMovie = computed(() => {
  if (Array.isArray(movies.value)) {
    return movies.value.find(movie => movie.id === selectedMovieId.value);
  } else if (movies.value && movies.value.movies) {
    return movies.value.movies.find(movie => movie.id === selectedMovieId.value);
  } else {
    return null;
  }
});

const editedMovieTitle = ref('');
const editedMovieDescription = ref('');
const editedMovieDuration = ref('');
const editedMovieReleaseDate = ref('');
const editedMovieActors = ref('');
const editedMovieCategory = ref('');
const searchQuery = ref('');

const formatReleaseDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Les mois vont de 0 à 11
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const toggleDetails = (movieId) => {
  selectedMovieId.value = selectedMovieId.value === movieId ? null : movieId;
  if (selectedMovie.value) {
    editedMovieTitle.value = selectedMovie.value.title;
    editedMovieDescription.value = selectedMovie.value.description;
    editedMovieDuration.value = selectedMovie.value.duration;
    editedMovieReleaseDate.value = formatReleaseDate(selectedMovie.value.releaseDate);
    editedMovieCategory.value = selectedMovie.value.category.id;
    editedMovieActors.value = selectedMovie.value.actors.map(actor => actor.id);
  } else {
    editedMovieTitle.value = '';
    editedMovieDescription.value = '';
    editedMovieDuration.value = '';
    editedMovieReleaseDate.value = '';
    editedMovieCategory.value = '';
    editedMovieActors.value = '';
    console.log(editedMovieCategory.value);
  }
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

    let apiUrl = 'https://127.0.0.1:8000/api/movies';

    if (selectedCategoryId.value !== 'default') {
      apiUrl = `https://127.0.0.1:8000/api/categories/${selectedCategoryId.value}`;
    }

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
    });

    categories.value = categoriesresponse.data;

    const actorsResponse = await axios.get('https://127.0.0.1:8000/api/authors', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }
    });
    actors.value = actorsResponse.data;

  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};

const updateMovieDetails = async () => {
  if (selectedMovie.value && (editedMovieTitle.value || editedMovieDescription.value)) {
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
      const updatedMovie = {
        title: editedMovieTitle.value,
        description: editedMovieDescription.value,
        duration: editedMovieDuration.value,
        releaseDate: editedMovieReleaseDate.value,
        category: `/api/categories/${editedMovieCategory.value}`,
        actors: editedMovieActors.value.map(actorId => `/api/authors/${actorId}`)
      };

      await axios.patch(
          `https://127.0.0.1:8000/api/movies/${selectedMovie.value.id}`,
          updatedMovie,
          { headers }
      );

      editedMovieTitle.value = '';
      editedMovieDescription.value = '';
      editedMovieDuration.value = '';
      editedMovieReleaseDate.value = '';
      editedMovieCategory.value = '';
      selectedMovieId.value = null;
      getMovies();
    } catch (error) {
      console.error('Error updating movie details:', error);
    }
  }
};

const closeModal = () => {
  selectedMovieId.value = null;
};

const updateCategory = (categoryId) => {
  selectedCategoryId.value = categoryId;
  getMovies();
};

onMounted(() => {
  getMovies();
});
</script>