<template>
  <main v-if="movie">
    <div class="category-details">
      <img :src="`${apiBaseUrl}/media/${movie.logo.filePath}`" :alt="movie.title" class="logo">
      <div class="time">
        <img src="@/assets/img/dummies/ad.png" alt="">
        <img src="@/assets/img/dummies/cc.png" alt="">
        {{ formatDate(movie.releaseDate) }} • {{ movie.duration }} minutes
      </div>
      <div class="categorie">
        {{ movie.category.name }}
      </div>
      <div class="buttons">
        <router-link :to="''" class="btn"><svg aria-hidden="true" aria-label="play" color="white" role="img" transform="" version="1.1" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" class="sc-bRBYWo jjKCrR"><title></title><path d="M27.147 20.421L11.27 29.274A2.2 2.2 0 0 1 8 27.353V9.647a2.2 2.2 0 0 1 3.271-1.921l15.876 8.852a2.2 2.2 0 0 1 0 3.843z" class="sc-Rmtcm cUjquv"></path></svg>Lecture</router-link>
        <router-link :to="''" class="btn btn--black">Bande-Annonce</router-link>
        <router-link :to="''" class="add-list"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0.25 0.25 25.5 25.5"><path fill="#F9F9F9" d="M22.85 10.1H15.9V3.15a2.9 2.9 0 0 0-5.8 0v6.95H3.15a2.9 2.9 0 0 0 0 5.8h6.95v6.95a2.9 2.9 0 0 0 5.8 0V15.9h6.95a2.9 2.9 0 1 0 0-5.8Z"/></svg></router-link>
      </div>
      <div class="description">{{ movie.description }}</div>
    </div>
    <div class="details">
      <div class="barre">
        <div class="titre">Details</div>
      </div>
      <div class="flex">
        <div class="left">
          <div class="titre">{{ movie.title }}</div>
          <div class="description">{{ movie.description }}</div>
        </div>
        <div class="right">
          <div class="flex">
            <div class="left">
              <div class="infos">
                Duree : <span>{{ movie.duration }} min</span>
              </div>
              <div class="infos">
                Categorie : <span></span>
                <router-link :to="'/categorie/' + movie.category.id">{{ movie.category.name }}</router-link>
              </div>
            </div>
            <div class="right">
              <div class="infos">
                Date de sortie : <span>{{ formatDate(movie.releaseDate) }}</span>
              </div>
              <div class="infos">
                Acteur :
                <ul>
                  <li v-for="actor in movie.actors" :key="actor['@id']">
                    <router-link :to="'/actor/' + actor.id">{{ actor.firstName }} {{ actor.lastName }}</router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="movie-background">
      <img :src="`${apiBaseUrl}/media/${movie.background.filePath}`" :alt="movie.title">
      <div class="contour"></div>
    </div>
  </main>
  <div v-else>
    Chargement...
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

let movie = ref(null)

const router = useRouter()

onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/')
      return
    }

    const movieId = router.currentRoute.value.params.id

    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/movies/${movieId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })

    movie.value = response.data
  } catch (error) {
    console.error('Error fetching movie:', error)
  }
})

import dayjs from 'dayjs';
import 'dayjs/locale/fr'; // Importez la locale française

const props = defineProps(['movie']);

const formatDate = (date) => {
  dayjs.locale('fr'); // Définissez la locale française
  return dayjs(date).format('DD MMMM YYYY');
};
</script>

<style scoped>
* {
  color: white;
}
</style>
