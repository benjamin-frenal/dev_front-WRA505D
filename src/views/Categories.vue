<template>
  <main>
    <div class="content--top">
      <div class="flex">
        <h1>Categories</h1>

        <div :class="[{ 'd-none Jmodal-modif': !showModal }, 'modal_modif']">
          <div class="modal-content">
            <span class="close" @click="showModal = false">&times;</span>
            <h2>Ajouter une catégorie</h2>
            <form @submit.prevent="addCategory">
              <div class="form-group form-group-pen">
                <label for="newCategoryName">Nom de la catégorie</label>
                <input type="text" v-model="newCategoryName" placeholder="Nom de la catégorie" required>
              </div>
              <button class="btn" type="submit">Ajouter</button>
            </form>
          </div>
        </div>

        <form class="search-form" action="http://127.0.0.1:5173/movies" method="get">
          <input type="text" name="title" placeholder="Entrez un titre" v-model="searchQuery">
          <div class="icons">
            <button type="submit" class="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
            <a v-if="searchQuery" href="/movies"><i class="fa-solid fa-xmark"></i></a>
          </div>
        </form>
        <button class="btn-add" @click="showModal = true">Ajouter une catégorie</button>

      </div>
    </div>
    <div class="list-categories">
      <div class="bloc-categories">
        <a :href="'categorie/' + category.id" class="bloc-categorie" v-for="category in data" :key="category.id">
          {{ category.name }}
        </a>
      </div>
    </div>

  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

let data = ref('')
let showModal = ref(false)
let newCategoryName = ref('')

onMounted(async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token){
      this.$router.push('/');
      return;
    }

    const response = await axios.get('https://127.0.0.1:8000/api/categories', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }
    })

    data.value = response.data
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
})
const addCategory = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token){
      this.$router.push('/');
      return;
    }

    const response = await axios.post('https://127.0.0.1:8000/api/categories', {
      name: newCategoryName.value
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }
    })

    // Mettre à jour la liste des catégories après l'ajout de la nouvelle catégorie
    data.value.push(response.data)
    showModal.value = false // Fermer la modal après l'ajout réussi
    newCategoryName.value = '' // Effacer le champ de saisie
  } catch (error) {
    console.error('Error adding category:', error)
  }
}
</script>