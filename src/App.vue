<script>
import {useRouter} from "vue-router";
import {useAccountStore} from "./stores/account.store.js";

export default {
  name: 'app',
  title: 'FacturApp',
  data() {
    return {
      router: useRouter(),
      accountStore: useAccountStore()
    }
  },
  computed: {
    isSignedIn() {
      return this.accountStore.isSignedIn;
    },
    currentUsername() {
      return this.accountStore.currentUsername;
    }
  },
  methods: {
    onSignOut() {
      this.accountStore.signOut(this.router);
    }
  }
}
</script>

<template>
  <header>
    <div v-if="isSignedIn" class="fixed top-0">
      <span class="fixed font-bold p-3 left-0">Bienvenido, {{ currentUsername }}</span>
      <pv-button text @click="onSignOut" class="m-3 text-white fixed right-0 bg-black-alpha-90 hover:bg-black-alpha-50 border-round-xl border-none">Sign Out</pv-button>
    </div>
  </header>
  <main>
    <router-view/>
  </main>
</template>

<style scoped>

</style>
