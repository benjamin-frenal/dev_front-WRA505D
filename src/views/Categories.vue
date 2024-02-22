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

        <form class="search-form" action="http://127.0.0.1:5173/categories" method="get">
          <input type="text" name="name" placeholder="Rechercher une catégorie" v-model="searchQuery">
          <div class="icons">
            <button type="submit" class="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
            <a v-if="searchQuery" href="/movies"><i class="fa-solid fa-xmark"></i></a>
          </div>
        </form>
        <button class="btn-add" @click="showModal = true">Ajouter une catégorie <i class="fa-solid fa-plus"></i></button>

      </div>
    </div>
    <div class="list-categories">
      <div class="bloc-categories">
        <div v-for="category in data" :key="category.id">
          <a :href="'categorie/' + category.id" class="bloc-categorie">
            {{ category.name }}
          </a>
          <div class="options">
            <a class="edit" @click="openEditCategoryModal(category)">Modifier</a>
            <a class="suppr" @click="openDeleteCategoryModal(category.id)">Supprimer</a>
          </div>
        </div>
      </div>
    </div>

    <div :class="{ 'd-none Jmodal-modif': !showDeleteModal }" class="modal_modif">
      <div class="modal-content">
        <span class="close" @click="closeDeleteCategoryModal">&times;</span>
        <h2>Confirmation de suppression</h2>
        <p class="sur-delete">Êtes-vous sûr de vouloir supprimer cette catégorie ?</p>
        <button class="btn" @click="confirmDeleteCategory">Confirmer la suppression</button>
      </div>
    </div>
    <div :class="{ 'd-none Jmodal-modif': !showEditModal }" class="modal_modif">
      <div class="modal-content">
        <span class="close" @click="showEditModal = false">&times;</span>
        <h2>Éditer une catégorie</h2>
        <form @submit.prevent="editCategory">
          <div class="form-group form-group-pen">
            <label for="editedCategoryName">Nom de la catégorie</label>
            <input type="text" v-model="editedCategoryName" placeholder="Nom de la catégorie" required>
          </div>
          <button class="btn" type="submit">Enregistrer les modifications</button>
        </form>
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
let showDeleteModal = ref(false);
let selectedCategoryId = ref(null);
let showEditModal = ref(false);
let editedCategoryName = ref('');
let searchQuery = ref('');

onMounted(() => {
  fetchData();
});

const fetchData = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token){
      this.$router.push('/');
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    searchQuery.value = urlParams.get('name') || '';

    let apiUrl = 'https://127.0.0.1:8000/api/categories';

    if (searchQuery.value) {
      apiUrl += `?name=${searchQuery.value}`;
    }

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    data.value = response.data
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

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

    data.value.push(response.data)
    showModal.value = false
    newCategoryName.value = ''
  } catch (error) {
    console.error('Error adding category:', error)
  }
}
const openDeleteCategoryModal = (categoryId) => {
  selectedCategoryId.value = categoryId;
  showDeleteModal.value = true;
};

const openEditCategoryModal = (category) => {
  selectedCategoryId.value = category.id;
  editedCategoryName.value = category.name; // Pré-remplir le champ avec le nom de la catégorie
  showEditModal.value = true;
};

const editCategory = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token){
      this.$router.push('/');
      return;
    }

    const response = await axios.put(`https://127.0.0.1:8000/api/categories/${selectedCategoryId.value}`, {
      name: editedCategoryName.value
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }
    });

    const index = data.value.findIndex(category => category.id === selectedCategoryId.value);
    if (index !== -1) {
      data.value[index] = response.data;
    }

    showEditModal.value = false;
    editedCategoryName.value = '';
    await fetchData();
  } catch (error) {
    console.error('Error editing category:', error)
  }
};

const UseCategoryModal = () => {
  alert('Cette catégorie ne peut pas être supprimée car elle est utilisée dans un ou plusieurs films. Si vous souhaitez supprimer cette catégorie, veuillez d\'abord supprimer les films associés.');
};

const closeDeleteCategoryModal = () => {
  selectedCategoryId.value = null;
  showDeleteModal.value = false;
};

const deleteCategory = async (categoryId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/');
      return;
    }

    const response = await axios.delete(`https://127.0.0.1:8000/api/categories/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }
    });

    data.value = data.value.filter(category => category.id !== categoryId);
  } catch (error) {
    UseCategoryModal();
  }
};

const confirmDeleteCategory = async () => {
  if (selectedCategoryId.value) {
    await deleteCategory(selectedCategoryId.value);
    closeDeleteCategoryModal();
  }
};
</script>