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
  <main>
    <div v-if="isSignedIn">
      <pv-button text @click="onSignOut">Sign Out</pv-button>
    </div>
    <router-view/>
  </main>
</template>

<style scoped>

</style>
