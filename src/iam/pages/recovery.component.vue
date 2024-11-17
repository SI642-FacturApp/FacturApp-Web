<script>
export default {
  name: "recovery",
  data() {
    return {
      method: null
    }
  }
}
</script>

<template>
  <img src="../../assets/logo.png" alt="FacturApp logo" width="300px">
  <h2>¿Olvidaste tu contraseña?</h2>
  <p>Ingresa tu correo electrónico o número de celular<br>para buscar tu cuenta.</p>
  <pv-input-text v-model="method" placeholder="Correo o teléfono..."/>
  <div class="pt-3">
    <pv-button class="bg-black-alpha-90 hover:bg-black-alpha-50 border-round-xl border-none w-full">
      Enviar
    </pv-button>
  </div>
</template>

<style scoped>

</style>