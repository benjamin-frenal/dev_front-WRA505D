<template>
  <main>
    <h1>Bienvenue sur mon Projet Application "Movies" - Benjamin Frenal S5 F</h1>
    <section class="home-categorie">
      <div class="bloc-categories">
        <a :href="'categorie/' + category.id" class="bloc-categorie" v-for="category in categories" :key="category.id">
          {{ category.name }}
        </a>
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
          <a :href="'actor/' + actor.id" class="bloc-categorie" v-for="actor in actors" :key="actor.id">
            <img :src="actor.image" class="image" alt="">
            <p>{{ actor.firstName }} {{ actor.lastName }}</p>
          </a>
        </div>
      </div>
    </section>
    <!--<section class="home-film">
      <h2>Tendance</h2>
      <div class="container-movies">
        <div class="movies">
          <div class="contour">
            <div class="movie-bloc">
              <img src="../assets/img/miniatures/les-simpson.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="../assets/img/miniatures/greys-anatomy.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="../assets/img/miniatures/desperate-housewives.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="@/assets/img/miniatures/malcolm.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="@/assets/img/miniatures/bluey.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="../assets/img/miniatures/modern-family.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="@/assets/img/miniatures/loki.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="../assets/img/miniatures/esprit-criminels.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="@/assets/img/miniatures/american-dad.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="@/assets/img/miniatures/ma-famille-dabord.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="@/assets/img/miniatures/how-i-met-your-mother.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="@/assets/img/miniatures/ahsoka.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="@/assets/img/miniatures/futurama.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="../assets/img/miniatures/les-griffin.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="../assets/img/miniatures/prison-break.jpeg" alt="">
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="home-film">
      <h2>Comédies</h2>
      <div class="container-movies">
        <div class="movies">
          <div class="contour">
            <div class="movie-bloc">
              <img src="../assets/img/miniatures/les-simpson.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="../assets/img/miniatures/greys-anatomy.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="../assets/img/miniatures/desperate-housewives.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="@/assets/img/miniatures/malcolm.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="@/assets/img/miniatures/bluey.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="../assets/img/miniatures/modern-family.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="@/assets/img/miniatures/loki.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="../assets/img/miniatures/esprit-criminels.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="@/assets/img/miniatures/american-dad.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="@/assets/img/miniatures/ma-famille-dabord.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="@/assets/img/miniatures/how-i-met-your-mother.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="@/assets/img/miniatures/ahsoka.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="@/assets/img/miniatures/futurama.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="../assets/img/miniatures/les-griffin.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="../assets/img/miniatures/prison-break.jpeg" alt="">
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="home-film">
      <h2>Drames</h2>
      <div class="container-movies">
        <div class="movies">
          <div class="contour">
            <div class="movie-bloc">
              <img src="../assets/img/miniatures/les-simpson.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="../assets/img/miniatures/greys-anatomy.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="../assets/img/miniatures/desperate-housewives.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="@/assets/img/miniatures/malcolm.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="@/assets/img/miniatures/bluey.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="../assets/img/miniatures/modern-family.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="@/assets/img/miniatures/loki.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="../assets/img/miniatures/esprit-criminels.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="@/assets/img/miniatures/american-dad.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="@/assets/img/miniatures/ma-famille-dabord.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="@/assets/img/miniatures/how-i-met-your-mother.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="@/assets/img/miniatures/ahsoka.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="@/assets/img/miniatures/futurama.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="../assets/img/miniatures/les-griffin.jpeg" alt="">
            </div>
          </div>
          <div class="contour">
            <div class="movie-bloc">
              <img src="../assets/img/miniatures/prison-break.jpeg" alt="">
            </div>
          </div>
        </div>
      </div>
    </section>-->
  </main>
</template>

<style scoped>
  *{
    color: white;
  }
  h1{
    text-align: center;
    margin: 172px 0 100px;
  }
  .list-acteurs{
    margin-top: 20px;
    padding: 0!important;
  }
</style>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import MovieCard from '@/components/MovieCard.vue';

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

    const categoriesResponse = await axios.get('https://127.0.0.1:8000/api/categories', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }
    })
    categories.value = categoriesResponse.data.slice(0, 6); // Pour afficher que les 6 premières catégories

    const actorsResponse = await axios.get('https://127.0.0.1:8000/api/authors', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }
    })
    actors.value = actorsResponse.data.slice(-4); // Pour afficher que les 4 derniers acteurs

    const moviesResponse = await axios.get('https://127.0.0.1:8000/api/movies', {
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