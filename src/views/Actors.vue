<template>
  <main>
    <div class="content--top">
      <div class="flex sb">
        <h1>Acteurs</h1>
        <button class="btn-add" @click="showModal = true">Ajouter un acteur <i class="fa-solid fa-plus"></i></button>
      </div>
    </div>
    <div class="list-acteurs">
      <div class="bloc-categories">
        <div v-for="actor in data" :key="actor.id">
          <a :href="'actor/' + actor.id" class="bloc-categorie">
            <img :src="actor.image" class="image" alt="">
            <div>{{ actor.firstName }} {{ actor.lastName }}</div>
          </a>
          <div class="options">
            <a class="edit" @click="openActorModal(actor.id)">Modifier</a>
            <a class="suppr" @click="openDeleteActorModal(actor.id)">Supprimer</a>
          </div>
        </div>
      </div>
    </div>
    <div :class="[{ 'd-none Jmodal-modif': !showModal }, 'modal_modif']">
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <h2>{{ editingMode ? 'Modifier un acteur' : 'Ajouter un acteur' }}</h2>
        <form @submit.prevent="editingMode ? updateActorDetails() : addActor()">
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
          <button class="btn" type="submit">{{ editingMode ? 'Modifier' : 'Ajouter' }}</button>
        </form>
      </div>
    </div>
    <div :class="{ 'd-none Jmodal-modif': !selectedActorId }" class="modal_modif">
      <div class="modal-content">
        <span class="close" @click="closeActorModal">&times;</span>
        <h2 v-if="selectedActor">{{ selectedActor.firstName }} {{ selectedActor.lastName }}</h2>
        <form class="modal_form" @submit.prevent="updateActorDetails">
          <div class="form-group form-group-pen">
            <label for="editActorFirstName">Prénom de l'acteur :</label>
            <input type="text" id="editActorFirstName" v-model="editedActorFirstName" required>
          </div>
          <div class="form-group form-group-pen">
            <label for="editActorLastName">Nom de l'acteur :</label>
            <input type="text" id="editActorLastName" v-model="editedActorLastName" required>
          </div>
          <div class="form-group form-group-pen">
            <label for="editActorImage">URL de l'image :</label>
            <input type="text" id="editActorImage" v-model="editedActorImage" required>
          </div>
          <button type="submit" class="btn">Valider les modifications</button>
        </form>
      </div>
    </div>
    <div :class="{ 'd-none Jmodal-modif': !showDeleteModal }" class="modal_modif">
      <div class="modal-content">
        <span class="close" @click="closeDeleteActorModal">&times;</span>
        <h2>Confirmation de suppression</h2>
        <p class="sur-delete">Êtes-vous sûr de vouloir supprimer cet acteur ?</p>
        <button class="btn" @click="confirmDeleteActor">Confirmer la suppression</button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import axios from 'axios'

let data = ref([])
let showModal = ref(false)
let newActorFirstName = ref('')
let newActorLastName = ref('')
let newActorImage = ref('')
let showDeleteModal = ref(false);
const selectedActorId = ref(null);
const selectedActor = computed(() => {
  return data.value.find(actor => actor.id === selectedActorId.value);
});
const editingMode = ref(false);
const editedActorFirstName = ref('');
const editedActorLastName = ref('');
const editedActorImage = ref('');

const openActorModal = (actorId) => {
  selectedActorId.value = actorId;
  if (selectedActor.value) {
    editingMode.value = true;
    editedActorFirstName.value = selectedActor.value.firstName;
    editedActorLastName.value = selectedActor.value.lastName;
    editedActorImage.value = selectedActor.value.image;
  }
};

const closeActorModal = () => {
  selectedActorId.value = null;
  editingMode.value = false;
  editedActorFirstName.value = '';
  editedActorLastName.value = '';
  editedActorImage.value = '';
};

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

    data.value.push(response.data)
    showModal.value = false
    newActorFirstName.value = ''
    newActorLastName.value = ''
    newActorImage.value = ''
  } catch (error) {
    console.error('Error adding actor:', error)
  }
}

const updateActorDetails = async () => {
  if (selectedActor.value && (editedActorFirstName.value || editedActorLastName.value)) {
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
      const updatedActor = {
        firstName: editedActorFirstName.value,
        lastName: editedActorLastName.value,
        image: editedActorImage.value
      };

      await axios.patch(
          `https://127.0.0.1:8000/api/authors/${selectedActor.value.id}`,
          updatedActor,
          {headers}
      );

      const response = await axios.get('https://127.0.0.1:8000/api/authors', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        }
      });
      data.value = response.data;

      closeActorModal();
    } catch (error) {
      console.error('Error updating actor details:', error);
    }
  }
};

const openDeleteActorModal = (actorId) => {
  selectedActorId.value = actorId;
  showDeleteModal.value = true;
};

const closeDeleteActorModal = () => {
  selectedActorId.value = null;
  showDeleteModal.value = false;
};

const confirmDeleteActor = async () => {
  if (selectedActorId.value) {
    await deleteActor(selectedActorId.value);
    closeDeleteActorModal();
  }
};

const deleteActor = async (actorId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/');
      return;
    }

    const response = await axios.delete(`https://127.0.0.1:8000/api/authors/${actorId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }
    });

    // Filtrer les acteurs pour enlever celui qui a été supprimé
    data.value = data.value.filter(actor => actor.id !== actorId);
  } catch (error) {
    console.error('Error deleting actor:', error);
  }
};

</script>

<style scoped>
* {
  color: white;
}
</style>
