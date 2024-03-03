<template>
  <div class="container">
    <div class="account" v-if="user">
      <h2>Compte</h2>
      <div class="encart">
        <div class="label">Détails de votre compte</div>
        <form @submit.prevent="updateUser">
          <div class="crayon">
            <input type="text" id="firstName" v-model="editedUser.firstName" />
          </div>
          <div class="crayon">
            <input type="text" id="lastName" v-model="editedUser.lastName" />
          </div>
          <div class="crayon">
            <input type="email" id="email" v-model="editedUser.email" />
          </div>
          <div class="buttons">
            <input type="submit" value="Enregistrer" />
            <a href="/">Annuler</a>
          </div>
        </form>
        <button @click="logout">Se déconnecter de tous les appareils</button>
      </div>

      <div class="encart">
        <div class="label">Abonnement</div>
        <form @submit.prevent="updateUser">
          <div class="forfait">
            MMICAST+ Standard (Mensuel)
            <span>Changer d'offre</span>
          </div>
        </form>
      </div>
    </div>
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
  localStorage.clear();
  router.push("/login");
};

onMounted(async () => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/${userId}`, {
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
    await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/users/${userId}`, editedUser.value, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: 'application/json',
      },
    });

    user.value = {...editedUser.value};
    alert("Vos informations ont été mises à jour. Pour des raisons de sécurité, veuillez vous reconnecter.");
    localStorage.clear();
    router.push("/login");
  } catch (error) {
    console.error(error);
    alert("Failed to update user information.");
  }
};
</script>

<style scoped>
.account{
  margin: 180px auto 75px ;
  .encart{
    border-radius: 4px;
    border: 1px solid rgb(49, 52, 62);
    display: flex;
    flex-flow: column;
    margin-bottom: 32px;
    min-width: 500px;
    .label{
      background-color: #31343e;
      color: #a8a9ad;
      font-family: Orkney-Light, sans-serif;
      font-size: 14px;
      padding: 0.45rem 1rem 0.25rem;
    }
    form{
      div{
        position: relative;
        -webkit-box-align: center;
        align-items: center;
        display: flex;
        flex-flow: row;
        min-height: 56px;
        cursor: pointer;
        border-bottom: 1px solid #31343e;
        margin: 0;
        input{
          font-family: Avenir-World-for-Disney-Demi, sans-serif;
          letter-spacing: .11px;
          font-size: 15px;
          padding: 16px;
          background: none;
          color: white;
          border: 0;
          width: 100%;
        }
      }
      .crayon{
        &::after{
          content: "\f304";
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          bottom: 0;
          border-radius: 50%;
          font-family: "Font Awesome 6 Free";
          font-weight: 900;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 30px;
          width: 30px;
          background-color: white;
          transition: all 0.2s;
        }
        &:hover::after{
          background-color: #67bdff;
          color: white;
        }
      }
      .forfait{
        display: flex;
        justify-content: space-between;
        align-content: center;
        font-family: Avenir-World-for-Disney-Demi, sans-serif;
        letter-spacing: .11px;
        font-size: 15px;
        padding: 0 16px;
        background: none;
        color: white;
        span{
          display: block;
          color: #67bdff;
          font-size: 12px;
        }
      }
      .buttons{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        input{
          padding: 0;
          width: 100%;
          height: 100%;
          background: #0058e1;
          cursor: pointer;
        }
        a{
          font-family: Orkney-Light, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          color: white;
          text-decoration: none;
        }
      }
    }
    button{
      font-family: Orkney-Light, sans-serif;
      color: #67bdff;
      height: 56px;
      border: 0;
      font-size: 15px;
      background: none;
      cursor: pointer;
    }
  }
  h2{
    font-family: "Avenir-World";
    font-size: 32px;
    letter-spacing: 0.11px;
    line-height: 1.2;
    margin: 0 0 1rem;
  }
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 2rem;
}

.container form div {
  margin-bottom: 1rem;
}
</style>
