<template>
  <div class="container">
    <p>You are logged in</p>
    <div v-if="user">
      <form @submit.prevent="updateUser">
        <div>
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" v-model="editedUser.firstName" />
        </div>
        <div>
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model="editedUser.lastName" />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="editedUser.email" />
        </div>
        <button type="submit" class="primary-button">Save Changes</button>
      </form>
    </div>
    <button @click="logout" class="primary-button">Log out</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const user = ref(null);
const editedUser = ref(null);

const logout = () => {
  console.log("logout");
  localStorage.removeItem("token");
  router.push("/login");
};

onMounted(async () => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await axios.get(`https://127.0.0.1:8000/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: 'application/json',
      },
    });
    user.value = response.data;

    editedUser.value = {...response.data};
  } catch (error) {
    console.error(error);
  }
});

const updateUser = async () => {
  try {
    const userId = localStorage.getItem("userId");
    await axios.put(`https://127.0.0.1:8000/api/users/${userId}`, editedUser.value, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: 'application/json',
      },
    });

    user.value = {...editedUser.value};
    alert("User information updated successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to update user information.");
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 2rem;
}

.container form div {
  margin-bottom: 1rem;
}
</style>
