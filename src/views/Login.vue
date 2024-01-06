<script setup>
import axios from "axios";
import { onMounted } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

let mail = ref("");
let password = ref("");
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
    const response = await axios.post("https://127.0.0.1:8000/api/login", {
      email: mail.value,
      password: password.value,
    });
    localStorage.setItem("token", response.data.token);
    router.push("/");
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
        </form>
      </div>
    </div>
    <footer>
      <nav>
        <ul>
          <li><a href="">Règles de Respect de la Vie Privée</a></li>
          <li><a href="">Modalités relatives aux cookies</a></li>
          <li><a href="">Droits Données dans l'UE et au R-U</a></li>
          <li><a href="">À propos de Disney+</a></li>
          <li><a href="">Conditions générales d'abonnement</a></li>
          <li><a href="">Aide</a></li>
          <li><a href="">Appareils compatibles</a></li>
          <li><a href="">Qui sommes-nous</a></li>
          <li><a href="">Publicités ciblées par centres d'intérêt</a></li>
          <li><a href="">Gérer les préférences de confidentialité</a></li>
          <li>© Disney. Tous droits réservés.</li>
        </ul>
      </nav>
    </footer>
  </div>
</template>

<style scoped>
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
</style>