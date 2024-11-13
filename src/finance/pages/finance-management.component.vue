<script>
import BanksComponent from "../components/banks.component.vue";
import BanksListComponent from "../components/banks-list.component.vue";

export default {
  name: "finance-management",
  components: {BanksListComponent, BanksComponent}
}
</script>

<template>
  <BanksComponent/>
  <BanksListComponent/>
</template>

<style scoped>

</style>