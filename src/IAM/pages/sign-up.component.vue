<script>
import SignUpForm from "../components/sign-up-form.component.vue";

export default {
  name: "sign-up",
  components: {SignUpForm}
}
</script>

<template>
  <img src="../../assets/logo.png" alt="FacturApp logo" width="300px">
  <div>
    <h2>Crea tu cuenta</h2>
    <sign-up-form/>
  </div>
</template>

<style scoped>

</style>