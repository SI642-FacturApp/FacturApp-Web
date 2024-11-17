<script>
import {useAccountStore} from "../../stores/account.store.js";
import {SignUpRequest} from "../model/sign-up.request.js";

export default {
  name: "sign-up",
  data() {
    return {
      accountStore: useAccountStore(),
      username: null,
      phone: null,
      email: null,
      password: null,
      repeat: null,
      terms: false,
    }
  },
  methods: {
    accountSignUp() {
      if (this.username && this.phone && this.email && this.password && this.repeat && this.terms && (this.password === this.repeat)) {
        let signUpRequest = new SignUpRequest(this.username, this.phone, this.email, this.password);
        this.accountStore.signUp(signUpRequest, this.$router)
      }
      else {
        console.log("All fields are required.")
      }
    }
  }
}
</script>

<template>
  <img src="../../assets/logo.png" alt="FacturApp logo" width="300px">
  <div>
    <h2>Crea tu cuenta</h2>
    <div class="w-full">
      <div class="pb-2">
        <pv-input-text
            v-model="username"
            placeholder="Usuario..."/>
      </div>
      <div class="pb-2">
        <pv-input-text
            v-model="phone"
            placeholder="Teléfono..."/>
      </div>
      <div class="pb-2">
        <pv-input-text
            v-model="email"
            placeholder="Correo..."/>
      </div>
      <div class="pb-2">
        <pv-password
            v-model="password"
            placeholder="Contraseña..."
            promptLabel="Ingrese la contraseña"
            weakLabel="Muy simple"
            mediumLabel="Aceptable"
            strongLabel="Fuerte"/>
      </div>
      <div class="pb-2">
        <pv-password v-model="repeat"
                     placeholder="Repetir contraseña..."
                     :feedback="false"/>
      </div>
      <div>
        <pv-checkbox v-model="terms" binary class="mr-1"/>
        <span>Acepto los términos y condiciones de esta página.</span>
      </div>
      <div>
        <span class="pr-1">¿Ya estás registrado?</span>
        <router-link to="/sign-in" class="hover:underline">Inicia sesión</router-link>
      </div>
      <div class="pt-2">
        <pv-button @click="accountSignUp" class="bg-black-alpha-90 hover:bg-black-alpha-50 border-round-xl border-none w-full">
          Crear Cuenta
        </pv-button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>