<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const handleLogout = () => {
  localStorage.clear();
  router.push('/login');
};
</script>

<template>
  <header v-if="route.path !== '/login' && route.path !== '/forgot-password'">
    <nav>
      <ul>
        <li>
          <img alt="Logo Disney +" class="logo" src="@/assets/logo.svg"/>
        </li>
        <li>
          <RouterLink to="/">
            <svg aria-hidden="true" aria-label="home" color="#ffffff" role="img" transform="" version="1.1" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" data-route="ACCUEIL" class="sc-bRBYWo bFBSwK"><title></title><path d="M26.882 19.414v10.454h-5.974v-5.227h-5.974v5.227H8.961V19.414H5.227L17.921 6.72l12.694 12.694h-3.733z" class="sc-Rmtcm cUjquv"></path></svg>
            <span>Accueil</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/actors" :class="{ active: route.path === '/actors' }">
            <svg class="plus-svg" xmlns='http://www.w3.org/2000/svg' viewBox='0.25 0.25 25.5 25.5'><path fill='#F9F9F9' d='M22.85 10.1H15.9V3.15a2.9 2.9 0 0 0-5.8 0v6.95H3.15a2.9 2.9 0 0 0 0 5.8h6.95v6.95a2.9 2.9 0 0 0 5.8 0V15.9h6.95a2.9 2.9 0 1 0 0-5.8Z'/></svg>
            <span>Acteurs</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/categories" :class="{ active: route.path === '/categories' }">
            <svg aria-hidden="true" aria-label="originals" color="#f9f9f9" role="img" transform="" version="1.1" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" data-route="ORIGINALS" class="sc-bRBYWo bFBSwK"><title></title><path d="M17.625 26.028L10.44 30l1.373-8.412L6 15.631l8.033-1.228 3.592-7.653 3.592 7.653 8.033 1.228-5.813 5.957L24.81 30z" class="sc-Rmtcm cUjquv"></path></svg>
            <span>Categories</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/movies" :class="{ active: route.path === '/movies' }">
            <svg aria-hidden="true" aria-label="movies" color="#f9f9f9" role="img" transform="" version="1.1" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" data-route="FILMS" class="sc-bRBYWo bFBSwK"><title></title><path d="M24.71 20.07a2.97 2.97 0 1 0-4.2-4.2 2.97 2.97 0 0 0 4.2 4.2m-12.262 0a2.97 2.97 0 1 0-4.2-4.2 2.97 2.97 0 0 0 4.2 4.2m6.173-10.31a2.969 2.969 0 1 0-4.199 4.198 2.969 2.969 0 0 0 4.199-4.198m0 12.262a2.969 2.969 0 1 0-4.199 4.198 2.969 2.969 0 0 0 4.199-4.198m-1.544-4.629a.846.846 0 1 0-1.197 1.196.846.846 0 0 0 1.197-1.196m18.06-.644c-3.33 6.913-8.165 9.928-11.635 11.24-2.57.971-4.762 1.178-5.949 1.208-.348.032-.698.053-1.052.053C10.287 29.25 5.25 24.213 5.25 18S10.287 6.75 16.5 6.75c6.214 0 11.25 5.037 11.25 11.25a11.19 11.19 0 0 1-2.493 7.054c2.832-1.612 5.844-4.382 8.138-9.143a.968.968 0 0 1 1.742.838" class="sc-Rmtcm cUjquv"></path></svg>
            <span>Films</span>
          </RouterLink>
        </li>
      </ul>
      <div class="profil">
        <span>Mon profil</span>
        <img src="@/assets/profil.png" alt="Image profil">
        <div class="options">
          <RouterLink to="/account" :class="{ active: route.path === '/account' }"><span>Modifier mon profil</span></RouterLink>
          <a href="#" @click="handleLogout">Se déconnecter</a>
        </div>
      </div>
    </nav>
  </header>
  <RouterView />
  <footer v-if="route.path !== '/login'">
    <img alt="Logo Disney +" class="logo" src="@/assets/logo.svg"/>
    <nav>
      <ul>
        <li><a href="">Règles de Respect de la Vie Privée</a></li>
        <li><a href="">Modalités relatives aux cookies</a></li>
        <li><a href="">Droits Données dans l'UE et au R-U</a></li>
        <li><a href="">À propos de Disney+</a></li>
        <li><a href="">Conditions générales d'abonnement</a></li>
        <li><a href="">Aide</a></li>
        <li><a href="">Résilier l'abonnement </a></li>
        <li><a href="">Appareils compatibles</a></li>
        <li><a href="">Qui sommes-nous</a></li>
        <li><a href="">Publicités ciblées par centres d'intérêt</a></li>
        <li><a href="">Gérer les préférences de confidentialité</a></li>
        <li><a href=""></a></li>
      </ul>
    </nav>
    <span>© Disney. Tous droits réservés.</span>
  </footer>
</template>

<style scoped>
header{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  row-gap: 1rem;
  .logo{
    width: 65px;
    height: 65px;
  }
  nav{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }
}
</style>
