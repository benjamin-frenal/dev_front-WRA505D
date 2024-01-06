import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Actors from '../views/Actors.vue'
import Actor from '../views/Actor.vue'
import Categories from '../views/Categories.vue'
import Categorie from '../views/Categorie.vue'
import Movies from '../views/Movies.vue'
import Movie from '../views/Movie.vue'
import LoginView from "../views/Login.vue";
import AccountView from "../views/Account.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/account",
      name: "account",
      component: AccountView,
      meta: { requiresAuth: true },
    },
    {
      path: '/actors',
      name: 'actors',
      component: Actors,
      meta: { requiresAuth: true },
    },
    {
      path: '/actor/:id',
      name: 'actor',
      component: Actor,
      meta: { requiresAuth: true },
    },
    {
      path: '/categories',
      name: 'categories',
      component: Categories,
      meta: { requiresAuth: true },
    },
    {
      path: '/categorie/:id',
      name: 'categorie',
      component: Categorie,
      meta: { requiresAuth: true },
    },
    {
      path: '/movies',
      name: 'movies',
      component: Movies,
      meta: { requiresAuth: true },
    },
    {
      path: '/movie/:id',
      name: 'movie',
      component: Movie,
      meta: { requiresAuth: true },
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = localStorage.token;
    if (!token) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;