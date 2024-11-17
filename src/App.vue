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
    <pv-toolbar v-if="isSignedIn" class="fixed top-0 left-0 w-full z-1 h-4rem border-noround">
      <template #start>
        <span class="font-bold">Bienvenido, {{ currentUsername }}</span>
      </template>
      <template #center>
        <pv-button text @click="this.router.push('/bills')" class="text-blue-50">Bills</pv-button>
        <pv-button text @click="this.router.push('/finance')" class="text-blue-50">Banks</pv-button>
      </template>
      <template #end>
        <pv-button text @click="onSignOut" class="text-white bg-black-alpha-90 hover:bg-black-alpha-50 border-round-xl border-none">Sign Out</pv-button>
      </template>
    </pv-toolbar>
  </header>
  <main>
    <router-view/>
  </main>
</template>

<style scoped>

</style>
