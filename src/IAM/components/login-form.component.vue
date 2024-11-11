<script>
export default {
  name: "login-form"
}
</script>

<template>
  <div class="w-full">
    <div class="pb-2">
      <pv-input-text placeholder="Usuario..."/>
    </div>
    <div class="pb-2">
      <pv-password
          placeholder="Contraseña..."
          :feedback="false"/>
    </div>
  </div>
  <pv-button class="bg-black-alpha-90 hover:bg-black-alpha-50 border-round-xl border-none w-full">
    Iniciar Sesión
  </pv-button>
</template>

<style scoped>

</style>