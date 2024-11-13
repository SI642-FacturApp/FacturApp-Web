<script>

export default {
  name: "sign-up-form",
  data() {
    return {
      mail: null,
      password: null,
      repeat: null,
      terms: false
    }
  }
}
</script>

<template>
  <div class="w-full">
    <div class="pb-2">
      <pv-input-text placeholder="Usuario..."/>
    </div>
    <div class="pb-2">
      <pv-input-text placeholder="Teléfono..."/>
    </div>
    <div class="pb-2">
      <pv-input-text
          v-model="mail"
          placeholder="Correo..."/>
    </div>
    <div class="pb-2">
      <pv-password
          v-model="password"
          placeholder="Contraseña..."
          promptLabel="Ingrese la contraseña"
          weakLabel="Complejidad simple"
          mediumLabel="Complejidad aceptable"
          strongLabel="Complejidad fuerte"/>
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
      <router-link to="/login" class="hover:underline">Inicia sesión</router-link>
    </div>
    <div class="pt-2">
      <pv-button class="bg-black-alpha-90 hover:bg-black-alpha-50 border-round-xl border-none w-full">
        Crear Cuenta
      </pv-button>
    </div>
  </div>
</template>

<style scoped>

</style>