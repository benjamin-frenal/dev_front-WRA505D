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
        <button class="btn-add" @click="openAddModal">Ajouter un film <i class="fa-solid fa-plus"></i></button>
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
      <div :class="{ 'd-none Jmodal-modif': !showDeleteModal }" class="modal_modif">
        <div class="modal-content">
          <span class="close" @click="closeDeleteModal">&times;</span>
          <h2>Confirmation de suppression</h2>
          <p class="sur-delete">Êtes-vous sûr de vouloir supprimer le film "{{ movieToDeleteTitle }}" ?</p>
          <div class="modal-buttons">
            <button @click="confirmDelete">Confirmer</button>
            <button @click="closeDeleteModal">Annuler</button>
          </div>
        </div>
      </div>
      <div :class="{ 'd-none Jmodal-modif': !showAddModal }" class="modal_modif">
        <div class="modal-content modal-content-film">
          <span class="close" @click="closeAddModal">&times;</span>
          <h2>Ajouter un film</h2>
          <form @submit.prevent="addMovie">
            <div class="form-group form-group-pen">
              <label for="title">Titre :</label>
              <input type="text" id="title" v-model="newMovie.title" required>
            </div>

            <div class="form-group form-group-pen">
              <label for="description">Description :</label>
              <textarea id="description" v-model="newMovie.description" required></textarea>
            </div>

            <div class="grid-group">
              <div class="form-group">
                <label for="releaseDate">Date de sortie :</label>
                <input type="date" id="releaseDate" v-model="newMovie.releaseDate" required>
              </div>
              <div class="form-group">
                <label for="duration">Durée (en minutes) :</label>
                <input type="number" id="duration" v-model="newMovie.duration" required>
              </div>
              <div class="form-group">
                <label for="miniature">Miniature :</label>
                <input type="text" id="miniature" v-model="newMovie.miniature" required>
              </div>
              <div class="form-group">
                <label for="background">Background :</label>
                <input type="text" id="background" v-model="newMovie.background" required>
              </div>
            </div>

            <div class="grid-group">
              <div class="form-group">
                <label for="logo">Logo :</label>
                <input type="text" id="logo" v-model="newMovie.logo" required>
              </div>
              <div class="form-group">
                <label for="category">Catégorie :</label>
                <select id="category" v-model="newMovie.category" required>
                  <option v-for="category in categories" :key="category.id" :value="category['@id']">
                    {{ category.name }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label for="actors">Acteurs :</label>
                <select id="actors" v-model="newMovie.actors" multiple required>
                  <option v-for="actor in actors" :key="actor.id" :value="actor.id">
                    {{ actor.firstName }} {{ actor.lastName }}
                  </option>
                </select>
              </div>
            </div>

            <button class="btn" type="submit">Ajouter</button>
          </form>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>

</style>

<script setup>
import {onMounted, ref, computed, watch} from 'vue';
import axios from 'axios';

const categories = ref('');
const actors = ref('');
const selectedCategoryId = ref('default');
const selectedMovieId = ref(null);
const movies = ref([]);
const searchQuery = ref('');
const showDeleteModal = ref(false);
const movieToDeleteId = ref(null);
const movieToDeleteTitle = ref('');
const editedMovieTitle = ref('');
const editedMovieDescription = ref('');
const editedMovieDuration = ref('');
const editedMovieReleaseDate = ref('');
const editedMovieActors = ref('');
const editedMovieCategory = ref('');


const selectedMovie = computed(() => {
  if (Array.isArray(movies.value)) {
    return movies.value.find(movie => movie.id === selectedMovieId.value);
  } else if (movies.value && movies.value.movies) {
    return movies.value.movies.find(movie => movie.id === selectedMovieId.value);
  } else {
    return null;
  }
});

const showAddModal = ref(false);
const newMovie = ref({
  title: '',
  description: '',
  duration: '',
  miniature: '',
  background: '',
  logo: '',
  category: '',
  actors: [],
});

const openAddModal = () => {
  showAddModal.value = true;
};

const closeAddModal = () => {
  showAddModal.value = false;
};

const addMovie = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/');
      return;
    }

    console.log(newMovie.value);

    // Envoyer les données du nouveau film au serveur
    await axios.post('https://127.0.0.1:8000/api/movies', newMovie.value, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    newMovie.value = {
      title: '',
      description: '',
      duration: '',
      miniature: '',
      background: '',
      logo: '',
      category: '',
      actors: [],
    };
    showAddModal.value = false;

    // Recharger la liste des films après l'ajout
    getMovies();
  } catch (error) {
    console.error('Error adding movie:', error);
  }
};

const toggleTrash = (movieId) => {
  const movieToDelete = movies.value.find(movie => movie.id === movieId);
  if (movieToDelete) {
    movieToDeleteId.value = movieId;
    movieToDeleteTitle.value = movieToDelete.title;
    showDeleteModal.value = true;
  }
};

const confirmDelete = () => {
  if (movieToDeleteId.value) {
    deleteMovie(movieToDeleteId.value);
    movieToDeleteId.value = null;
    showDeleteModal.value = false;
  }
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
};

const deleteMovie = async (movieId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/');
      return;
    }

    await axios.delete(`https://127.0.0.1:8000/api/movies/${movieId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    getMovies();
  } catch (error) {
    console.error('Error deleting movie:', error);
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
      }
    });

    categories.value = categoriesresponse.data['hydra:member'];
    console.log(categories.value)

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

onMounted(() => {
  getMovies();
});
</script>