<template>
  <main>
    <div class="content--top">
      <div class="flex">
        <div class="left">
          <h1>Films</h1>
          <form  class="select" action="">
            <select name="categories" id="categories" @change="updateCategory($event.target.value)">
              <option value="default">Tous les films</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </form>
        </div>
        <div class="right">
          <form class="search-form" method="get">
            <input type="text" name="title" placeholder="Rechercher un film" v-model="searchQuery" @input="searchMovies">
            <div class="icons">
              <button type="button" class="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
              <button v-if="searchQuery" style="border: none; background: none"><i class="fa-solid fa-xmark"></i></button>
            </div>
          </form>
          <button class="btn-add" @click="openAddModal">Ajouter un film <i class="fa-solid fa-plus"></i></button>
        </div>
      </div>
    </div>
    <section class="list-film">
      <div class="container-movies">
        <div class="movies">
          <div v-if="selectedCategoryId !== 'default'" class="contour" v-for="movie in movies.movies" :key="movie['@id']">
            <div class="div" style="color: white">
              <router-link :to="'movie/' + movie.id" class="movie-bloc">
                <img :src="`${apiBaseUrl}/media/${movie.miniature.filePath}`" :alt="movie.title">
              </router-link>
            </div>
            <div class="texte">
              <p>{{movie.title}}</p>
              <p class="description">{{movie.description}}</p>
            </div>
          </div>
          <div v-else class="contour" v-for="movie in movies" :key="movie['@id']">
            <div class="div" style="color: white">
              <router-link :to="'movie/' + movie.id" class="movie-bloc">
                <img :src="`${apiBaseUrl}/media/${movie.miniature.filePath}`" :alt="movie.title">
              </router-link>
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
      <div class="pagination" v-if="showPagination">
        <button @click="prevPage" :class="{ inactive: currentPage === 1 }">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <span>Page {{ currentPage }} sur {{ totalPages }}</span>
        <button @click="nextPage" :class="{ inactive: currentPage === totalPages }">
          <i class="fa-solid fa-arrow-right"></i>
        </button>
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
                minlength="3"
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
          <div class="grid-group">
            <div class="form-group">
              <label for="editMiniature">Miniature :</label>
              <input type="file" ref="newfileInputMiniature" @change="newuploadFileMiniature" />
            </div>
            <div class="form-group">
              <label for="editBackground">Background :</label>
              <input type="file" ref="newfileInputBackground" @change="newuploadFileBackground" />
            </div>
            <div class="form-group">
              <label for="editLogo">Logo :</label>
              <input type="file" ref="newfileInputLogo" @change="newuploadFileLogo" />
            </div>
          </div>
          <span class="alert">Pensez à changer les trois images <i>(pour l'instant :)</i></span>
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
              <input type="text" id="title" v-model="newMovie.title" minlength="3" required>
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
                  <option v-for="actor in actors" :key="actor.id" :value="'/api/authors/'+actor.id">
                    {{ actor.firstName }} {{ actor.lastName }}
                  </option>
                </select>
              </div>
            </div>

            <div class="grid-group">
              <div class="form-group">
                <label for="miniature">Miniature :</label>
                <input type="file" ref="fileInputMiniature" @change="uploadFileMiniature" />
              </div>
              <div class="form-group">
                <label for="background">Background :</label>
                <input type="file" ref="fileInputBackground" @change="uploadFileBackground" />
              </div>
              <div class="form-group">
                <label for="logo">Logo :</label>
                <input type="file" ref="fileInputLogo" @change="uploadFileLogo" />
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
input[type="file"] {
  width: 200px;
}
</style>

<script setup>
import {onMounted, ref, computed, watch} from 'vue';
import axios from 'axios';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

let categories = ref('');
let actors = ref('');
let selectedCategoryId = ref('default');
let selectedMovieId = ref(null);
let movies = ref([]);
let searchQuery = ref('');
let currentPage = ref(1);
let totalPages = ref(1);
let showDeleteModal = ref(false);
let movieToDeleteId = ref(null);
let movieToDeleteTitle = ref('');
let editedMovieTitle = ref('');
let editedMovieDescription = ref('');
let editedMovieDuration = ref('');
let editedMovieReleaseDate = ref('');
let editedMovieActors = ref('');
let editedMovieCategory = ref('');
let showPagination = ref(false);
let editedMovieMiniature = ref('');
let editedMovieBackground = ref('');
let editedMovieLogo = ref('');

let fileInputMiniature = ref(null);
let upload_miniature = ref(null);

let fileInputBackground = ref(null);
let upload_background = ref(null);

let fileInputLogo = ref(null);
let upload_logo = ref(null);

let newfileInputMiniature = ref(null);
let newupload_miniature = ref(null);

let newfileInputBackground = ref(null);
let newupload_background = ref(null);

let newfileInputLogo = ref(null);
let newupload_logo = ref(null);

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

const uploadFileMiniature = async () => {
  const file = fileInputMiniature.value.files[0];
  const formData = new FormData();
  formData.append('file', file);

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/');
      return;
    }

    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/media_objects`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    upload_miniature.value = "/api/media_objects/" + response.data.id;
    console.log(upload_miniature.value);

    newMovie.value.miniature = upload_miniature.value;
  } catch (error) {
    console.error('Erreur lors du téléchargement du fichier:', error);
  }
};
const uploadFileBackground = async () => {
  const file = fileInputBackground.value.files[0];
  const formData = new FormData();
  formData.append('file', file);

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/');
      return;
    }

    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/media_objects`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    upload_background.value = "/api/media_objects/" + response.data.id;

    newMovie.value.background = upload_background.value;
    console.log(upload_background.value);
  } catch (error) {
    console.error('Erreur lors du téléchargement du fichier:', error);
  }
};
const uploadFileLogo = async () => {
  const file = fileInputLogo.value.files[0];
  const formData = new FormData();
  formData.append('file', file);

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/');
      return;
    }

    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/media_objects`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    upload_logo.value = "/api/media_objects/" + response.data.id;
    console.log(upload_logo.value);

    newMovie.value.logo = upload_logo.value;
  } catch (error) {
    console.error('Erreur lors du téléchargement du fichier:', error);
  }
};

const newuploadFileMiniature = async () => {
  const file = newfileInputMiniature.value.files[0];
  const formData = new FormData();
  formData.append('file', file);

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/');
      return;
    }

    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/media_objects`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    newupload_miniature.value = "/api/media_objects/" + response.data.id;
    console.log(newupload_miniature.value);

    newMovie.value.miniature = newupload_miniature.value;
  } catch (error) {
    console.error('Erreur lors du téléchargement du fichier:', error);
  }
};
const newuploadFileBackground = async () => {
  const file = newfileInputBackground.value.files[0];
  const formData = new FormData();
  formData.append('file', file);

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/');
      return;
    }

    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/media_objects`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    newupload_background.value = "/api/media_objects/" + response.data.id;

    newMovie.value.background = newupload_background.value;
    console.log(newupload_background.value);
  } catch (error) {
    console.error('Erreur lors du téléchargement du fichier:', error);
  }
};
const newuploadFileLogo = async () => {
  const file = newfileInputLogo.value.files[0];
  const formData = new FormData();
  formData.append('file', file);

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/');
      return;
    }

    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/media_objects`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    newupload_logo.value = "/api/media_objects/" + response.data.id;
    console.log(newupload_logo.value);

    newMovie.value.logo = newupload_logo.value;
  } catch (error) {
    console.error('Erreur lors du téléchargement du fichier:', error);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    getMovies(currentPage.value);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    getMovies(currentPage.value);
  }
};

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

    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/movies`, newMovie.value, {
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

    await getMovies();
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

    await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/movies/${movieId}`, {
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
        actors: editedMovieActors.value.map(actorId => `/api/authors/${actorId}`),
        miniature: newupload_miniature.value,
        background: newupload_background.value,
        logo: newupload_logo.value,
      };

      await axios.patch(
          `${import.meta.env.VITE_API_BASE_URL}/api/movies/${selectedMovie.value.id}`,
          updatedMovie,
          { headers }
      );

      editedMovieTitle.value = '';
      editedMovieDescription.value = '';
      editedMovieDuration.value = '';
      editedMovieReleaseDate.value = '';
      editedMovieCategory.value = '';
      selectedMovieId.value = null;
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
      await getMovies();
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
    editedMovieMiniature.value = selectedMovie.value.miniature;
    editedMovieBackground.value = selectedMovie.value.background;
    editedMovieLogo.value = selectedMovie.value.logo;
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

const searchMovies = () => {
  getMovies(searchQuery.value);
};

const getMovies = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/');
      return;
    }

    let apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/movies`;

    if (currentPage.value) {
      apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/movies?page=${currentPage.value}`;
    }

    if (searchQuery.value) {
      apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/movies?title=${searchQuery.value}`;
    }

    if (selectedCategoryId.value !== 'default') {
      apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/categories/${selectedCategoryId.value}`;
    }

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    movies.value = response.data['hydra:member'];

    if (selectedCategoryId.value !== 'default') {
      movies.value = response.data;
      showPagination = false;
    } else {
      showPagination = true;
    }

    totalPages.value = Math.ceil(response.data["hydra:totalItems"] / 30);

    const categoriesresponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    categories.value = categoriesresponse.data['hydra:member'];
    console.log(categories.value)

    const actorsResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/authors`, {
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
  getMovies(currentPage.value);
});
</script>