<script setup>
import axios from "axios";
import { onMounted } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

let mail = ref("");
let password = ref("");
let userId = ref(null); // Ajout de la référence pour stocker l'ID de l'utilisateur
const router = useRouter();

onMounted(() => {
  isTokenValid();
});

const isTokenValid = () => {
  if (localStorage.getItem("token")) {
    router.push("/");
  }
};

const login = async () => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/login`, {
      email: mail.value,
      password: password.value,
    });
    localStorage.setItem("token", response.data.token);

    await fetchUserId();
    router.push("/");
  } catch (error) {
    console.error(error);
  }
};


const fetchUserId = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users?email=${mail.value}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: 'application/json',
      },
    });
    console.log('USERID : ', response.data[0].id);
    const userId = response.data[0].id;
    localStorage.setItem('userId', userId);
  } catch (error) {
    console.error(error);
  }
};

const isMailFocused = ref(false);
const isPasswordFocused = ref(false);

const handleFocus = (value, field) => {
  if (field === 'mail') {
    isMailFocused.value = value;
  } else if (field === 'password') {
    isPasswordFocused.value = value;
  }
};
</script>


<template>
  <div class="login-view">
    <header>
      <img src="@/assets/logo.svg" alt="Disney">
    </header>
    <div class="container">
      <div class="formulaire">
        <span>Connexion</span>
        <h1>Entrez vos identifiants pour continuer</h1>
        <p>Identifiez-vous sur votre compte.</p>
        <form @submit.prevent="login" class="form">
          <div class="field" :class="{ 'is-focus': isMailFocused, 'value-ok': mail !== '' }"
               @focusin="handleFocus(true, 'mail')"
               @focusout="handleFocus(false, 'mail')">
            <label for="mail">Adresse e-mail</label>
            <input type="text" id="mail" v-model="mail" />
          </div>
          <div class="field" :class="{ 'is-focus': isPasswordFocused, 'value-ok': password !== '' }"
               @focusin="handleFocus(true, 'password')"
               @focusout="handleFocus(false, 'password')">
            <label for="password">Mot de passe</label>
            <input type="password" id="password" v-model="password"/>
          </div>
          <button type="submit" class="primary-button">Continuer</button>
          <router-link class="onhref" :to="'/forgot-password'">Mot de passe oublié ?</router-link>
        </form>
      </div>
    </div>
    <footer>
      <nav>
        <ul>
          <li><router-link :to="''">Règles de Respect de la Vie Privée</router-link></li>
          <li><router-link :to="''">Modalités relatives aux cookies</router-link></li>
          <li><router-link :to="''">Droits Données dans l'UE et au R-U</router-link></li>
          <li><router-link :to="''">À propos de Disney+</router-link></li>
          <li><router-link :to="''">Conditions générales d'abonnement</router-link></li>
          <li><router-link :to="''">Aide</router-link></li>
          <li><router-link :to="''">Appareils compatibles</router-link></li>
          <li><router-link :to="''">Qui sommes-nous</router-link></li>
          <li><router-link :to="''">Publicités ciblées par centres d'intérêt</router-link></li>
          <li><router-link :to="''">Gérer les préférences de confidentialité</router-link></li>
          <li>© Disney. Tous droits réservés.</li>
        </ul>
      </nav>
    </footer>
  </div>
</template>

<style scoped>
.container{
  min-height: calc(100vh - 120px - 171px);
}
  .login-view{
    background: radial-gradient(circle at bottom, #2346A0, #050320);
    & header{
      position: relative!important;
      background-color: transparent!important;
      padding: 15px 0 0!important;
      justify-content: center;
      > img{
        width: 159px;
      }
    }
    & .container{
      & .formulaire{
        box-sizing: border-box;
        width: 580px;
        max-width: 100%;
        padding: 56px 72px;
        margin: 42px auto;
        background-color: white;
        border-radius: 24px;
        @media screen and (max-width: 767px){
          padding: 28px 36px;
        }
        & span{
          font-size: 14px;
          text-transform: uppercase;
          color: #252526;
        }
        & h1{
          margin-top: 5px;
          font-size: 28px;
          color: #252526;
          line-height: 40px;
        }
        & p{
          font-family: "Orkney-Light", sans-serif;
          color: #4F4F50;
        }
        & form{
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        & .field{
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
          height: 60px;
          font-size: 16px;
          background-color: #e9ebf0;
          border-radius: 4px;
          overflow: hidden;
          cursor: text;
          & label{
            pointer-events: none;
            font-family: "Orkney-Light";
            box-sizing: border-box;
            position: absolute;
            color: rgb(95, 97, 102);
            display: block;
            height: 20px;
            left: 16px;
            top: 18px;
            line-height: 24px;
            font-size: 16px;
            transition: all 0.2s ;
          }
          & input{
            font-size: 16px;
            font-family: 'Orkney-Light', sans-serif;
            flex: 1 1 auto;
            height: 100%;
            padding: 26px 16px 10px;
            color: #252526;
            line-height: 24px;
            border: 0;
            background: none;
            outline: none;
          }
          &::before{
            position: absolute;
            content: "";
            left: 0;
            bottom: 0;
            right: 0;
            border-bottom: 2px solid transparent;
            pointer-events: none;
            transition: all 0.2s;
          }
        }
        & .is-focus, .value-ok {
          & label{
            top: 6px!important;
            line-height: 20px;
            font-size: 12px;
          }
        }
        & .is-focus{
          &::before{
            border-bottom-color: #252526;
          }
        }
        .primary-button{
          width: 100%;
          background-color: #0058e1;
          color: white;
          height: 52px;
          padding: 14px 24px;
          border-radius: 26px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: none;
          font-size: 16px;
          cursor: pointer;
          transition: 0.2s;
          &:hover{
            background-color: #0682f0;
          }
        }
      }
    }
    & footer{
      background-color: white!important;
      justify-content: center!important;
      padding: 28px 40px!important;
      & nav {
        & ul{
          gap: 16px 36px!important;
          & li, & li a{
            font-size: 14px!important;
            line-height: 24px!important;
            color: #5f6166!important;
            &:hover{
              color: #252526!important;
            }
          }
        }
      }
    }
  }
  .onhref{
    margin: 0;
    text-align: center;
    font-family: "Orkney-Light", sans-serif;
    font-size: 14px;
    color: #0058e1;
    text-decoration: none;
    &:hover{
      text-decoration: underline;
    }
  }
</style>