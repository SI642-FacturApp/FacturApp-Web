<script>
import LoginForm from "../components/login-form.component.vue";

export default {
  name: "login",
  components: {LoginForm}
}
</script>

<template>
  <div>
    <img src="../../assets/logo.png" alt="FacturApp logo" width="300px">
    <login-form/>
    <div>
      ¿No tienes una cuenta?
      <router-link to="/signup">Regístrate</router-link>
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