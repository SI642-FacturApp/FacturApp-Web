<script>
import {useAccountStore} from "../../stores/account.store.js";
import {SignInRequest} from "../model/sign-in.request.js";

export default {
  name: "sign-in",
  data() {
    return {
      email: null,
      password: null,
      userService: null
    }
  },
  methods: {
    accountSignIn() {
      let accountStore = useAccountStore();
      if (this.email && this.password) {
        let signInRequest = new SignInRequest(this.email, this.password);
        accountStore.signIn(signInRequest, this.$router)
      }
      else {
        console.log("Email and password are required.")
      }
    }
  }
}


</script>

<template>
  <div>
    <img src="../../assets/logo.png" alt="FacturApp logo" width="300px">
    <div class="w-full">
      <div class="pb-2">
        <pv-input-text
            v-model="email"
            placeholder="Correo..."/>
      </div>
      <div class="pb-2">
        <pv-password
            v-model="password"
            placeholder="Contraseña..."
            :feedback="false"/>
      </div>
    </div>
    <pv-button @click="accountSignIn" class="bg-black-alpha-90 hover:bg-black-alpha-50 border-round-xl border-none w-full">
      Iniciar Sesión
    </pv-button>
    <div>
      ¿No tienes una cuenta?
      <router-link to="/sign-up">Regístrate</router-link>
    </div>
    <div>
      ¿Olvidaste tu contraseña?
      <router-link to="/recovery">
        Recupérala
      </router-link>
    </div>
  </div>



</template>

<style scoped>

</style>