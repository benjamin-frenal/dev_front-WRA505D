<template>
  <main>
    <div class="content--top">
      <div class="flex sb">
        <h1>Acteurs</h1>
        <button class="btn-add" @click="showModal = true">Ajouter un acteur <i class="fa-solid fa-plus"></i></button>
      </div>
    </div>
    <div :class="[{ 'd-none Jmodal-modif': !showModal }, 'modal_modif']">
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <h2>Ajouter un acteur</h2>
        <form @submit.prevent="addActor">
          <div class="form-group form-group-pen">
            <label for="newActorFirstName">Prénom</label>
            <input type="text" v-model="newActorFirstName" placeholder="Prénom" required>
          </div>
          <div class="form-group form-group-pen">
            <label for="newActorLastName">Nom</label>
            <input type="text" v-model="newActorLastName" placeholder="Nom" required>
          </div>
          <div class="form-group form-group-pen">
            <label for="newActorImage">URL de l'image</label>
            <input type="text" v-model="newActorImage" placeholder="URL de l'image">
          </div>
          <button class="btn" type="submit">Ajouter</button>
        </form>
      </div>
    </div>
    <div class="list-acteurs">
      <div class="bloc-categories">
        <a :href="'actor/' + actor.id" class="bloc-categorie" v-for="actor in data" :key="actor.id">
          <img :src="actor.image" class="image" alt="">
          <div>{{ actor.firstName }} {{ actor.lastName }}</div>
        </a>
      </div>
    </div>
  </main>
</template>

<style scoped>
</style>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

let data = ref('')
let showModal = ref(false)
let newActorFirstName = ref('')
let newActorLastName = ref('')
let newActorImage = ref('')

onMounted(async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token){
      this.$router.push('/');
      return;
    }

    const response = await axios.get('https://127.0.0.1:8000/api/authors', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }
    })
    console.log(response.data)
    data.value = response.data
  } catch (error) {
    console.error('Error fetching authors:', error)
  }
})
const addActor = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token){
      this.$router.push('/');
      return;
    }

    const response = await axios.post('https://127.0.0.1:8000/api/authors', {
      firstName: newActorFirstName.value,
      lastName: newActorLastName.value,
      image: newActorImage.value
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }
    })

    // Mettre à jour la liste des acteurs après l'ajout du nouvel acteur
    data.value.push(response.data)
    showModal.value = false // Fermer la modal après l'ajout réussi
    // Effacer les champs de saisie
    newActorFirstName.value = ''
    newActorLastName.value = ''
    newActorImage.value = ''
  } catch (error) {
    console.error('Error adding actor:', error)
  }
}
</script>
<style scoped>
*{
  color: white;
}
</style>
