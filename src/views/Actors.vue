<template>
  <main>
    <div class="content--top">
      <div class="flex sb">
        <h1>Acteurs</h1>

        <div class="right">
          <form class="search-form" method="get">
            <input type="text" name="name" placeholder="Rechercher un acteur/une actrice" v-model="searchQuery">
            <div class="icons">
              <button type="submit" class="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
              <a v-if="searchQuery" href="/movies"><i class="fa-solid fa-xmark"></i></a>
            </div>
          </form>
          <button class="btn-add" @click="showModal = true">Ajouter un acteur <i class="fa-solid fa-plus"></i></button>
        </div>
      </div>
    </div>
    <div class="list-acteurs">
      <div class="bloc-categories">
        <div v-for="actor in data" :key="actor.id">
          <a :href="'actor/' + actor.id" class="bloc-categorie">
            <img v-if="actor.image && actor.image.filePath" :src="`${apiBaseUrl}/media/`+actor.image.filePath" class="image" alt="">
            <div>{{ actor.firstName }} {{ actor.lastName }}</div>
          </a>
          <div class="options">
            <a class="edit" @click="openActorModal(actor.id)">Modifier</a>
            <a class="suppr" @click="openDeleteActorModal(actor.id)">Supprimer</a>
          </div>
        </div>
      </div>
      <div class="pagination">
        <button @click="prevPage" :class="{ inactive: currentPage === 1 }">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <span>Page {{ currentPage }} sur {{ totalPages }}</span>
        <button @click="nextPage" :class="{ inactive: currentPage === totalPages }">
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
    <div :class="[{ 'd-none Jmodal-modif': !showModal }, 'modal_modif']">
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <h2>Ajouter un acteur</h2>
        <form @submit.prevent="addActor()">
          <div class="form-group form-group-pen">
            <label for="newActorFirstName">Prénom</label>
            <input type="text" v-model="newActorFirstName" placeholder="Prénom" required>
          </div>
          <div class="form-group form-group-pen">
            <label for="newActorLastName">Nom</label>
            <input type="text" v-model="newActorLastName" placeholder="Nom" required>
          </div>
          <div class="form-group form-group-pen">
            <label for="newActorImage">Image</label>
            <input type="file" ref="fileInput" @change="uploadFile" />
          </div>
          <button class="btn" type="submit">Ajouter</button>
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
          <div class="form-group">
            <label for="editActorImage">
              <img v-if="selectedActor && selectedActor.image && selectedActor.image.filePath" :src="`${apiBaseUrl}/media/` + selectedActor.image.filePath" class="current-image" alt="Current Image">
            </label>
            <input type="file" ref="newfileInput" @change="uploadNewFile" />
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

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

let data = ref([])
let showModal = ref(false)
let newActorFirstName = ref('')
let newActorLastName = ref('')
let upload_img = ref('')
let showDeleteModal = ref(false);
let currentPage = ref(1);
let totalPages = ref(1);
let selectedActorId = ref(null);
let selectedActor = computed(() => {
  return data.value.find(actor => actor.id === selectedActorId.value);
});
let editingMode = ref(false);
let editedActorFirstName = ref('');
let editedActorLastName = ref('');
let editedActorImage = ref('');
let searchQuery = ref('');

let fileInput = ref(null);
let newfileInput = ref(null);
let newupload_img = ref(null);

const uploadFile = async () => {
  const file = fileInput.value.files[0];
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

    upload_img.value = "/api/media_objects/" + response.data.id;
    console.log(upload_img.value);
  } catch (error) {
    console.error('Erreur lors du téléchargement du fichier:', error);
  }
};

const uploadNewFile = async () => {
  const file = newfileInput.value.files[0];
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

    newupload_img.value = "/api/media_objects/" + response.data.id;
    console.log(newupload_img.value);
  } catch (error) {
    console.error('Erreur lors du téléchargement du fichier:', error);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    getActors(currentPage.value);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    getActors(currentPage.value);
  }
};

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
  newfileInput.value.value = null;
  fileInput.value.value = null;
};

const getActors = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token){
      this.$router.push('/');
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    searchQuery.value = urlParams.get('name') || '';

    let apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/authors`;

    if (currentPage.value) {
      apiUrl += `?page=${currentPage.value}`;
    }

    if (searchQuery.value) {
      apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/authors?fullName=${searchQuery.value}`;
    }

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    data.value = response.data['hydra:member'];
    console.log(data.value);
    console.log(apiUrl);

    totalPages.value = Math.ceil(response.data["hydra:totalItems"] / 30);
  } catch (error) {
    console.error('Error fetching authors:', error)
  }
}

const addActor = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token){
      this.$router.push('/');
      return;
    }

    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/authors`, {
      firstName: newActorFirstName.value,
      lastName: newActorLastName.value,
      image: upload_img.value
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
    fileInput.value.value = null;
    await getActors();
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
      let updatedActor = {
        firstName: editedActorFirstName.value,
        lastName: editedActorLastName.value,
      };

      if (newupload_img.value) {
        updatedActor.image = newupload_img.value;
      }

      await axios.patch(
          `${import.meta.env.VITE_API_BASE_URL}/api/authors/${selectedActor.value.id}`,
          updatedActor,
          {headers}
      );

      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/authors`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        }
      });
      data.value = response.data;


      await getActors();
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

    const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/authors/${actorId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }
    });

    data.value = data.value.filter(actor => actor.id !== actorId);
    await getActors();
  } catch (error) {
    console.error('Error deleting actor:', error);
  }
};

onMounted(() => {
  getActors()
})

</script>

<style scoped>
</style>