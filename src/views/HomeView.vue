<template>
  <main>
    <img src="@/assets/banner-home.png" alt="" style="width: 100%; margin-top: 18px">
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
          <div class="contour" v-for="movie in movies" :key="movie.id" >
            <div class="div" style="color: white">
              <a :href="'movie/' + movie.id" class="movie-bloc">
                <img :src="movie.miniature" :alt="movie.title">
              </a>
            </div>
            <div class="texte">
              <p>{{movie.title}}</p>
              <p class="description">{{movie.description}}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="quatre-acteurs">
      <h2>Nos quatre derniers acteurs</h2>
      <div class="container-movies">
        <div v-for="actor in actors" :key="actor.id">
          <p>{{ actor.firstName }} {{ actor.lastName }}</p>
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
</style>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

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