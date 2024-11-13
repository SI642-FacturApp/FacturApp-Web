<script>

import {Button as PvButton, InputNumber as PvInputNumber} from "primevue";

export default {
  name: "banks",
  components: {PvButton, PvInputNumber},

  data() {
    return {
      banks: [],
      dialogVisible: false,

    }
  },
  methods: {
    clear() {
      this.banks = [];
    },
    addBank() {
      //this.banks.push({name: '', tca: ''});

      this.dialogVisible = false;
      this.clear();
    }
  }

}
</script>

<template>
  <pv-button label="Add Bank" @click="dialogVisible = true"/>
  <pv-dialog header="Bank Details" v-model:visible="dialogVisible">
    <pv-float-label>
      <label for="name">Bank Name</label>
      <pv-input-text id="name" v-model="banks.name" />
    </pv-float-label>
    <pv-float-label>
      <label for="tca">Bank TEA</label>
      <pv-input-number id="tea" v-model="banks.tea" />
    </pv-float-label>
    <pv-float-label>
      <label for="image">Bank image</label>
      <pv-input-text id="image" v-model="banks.image" />
    </pv-float-label>

    <pv-button label="Save" @click="addBank"/>
  </pv-dialog>
</template>

<style scoped>

</style>