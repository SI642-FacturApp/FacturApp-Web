<script>
import {Bank} from "../model/bank.entity.js";
import {FinanceService} from "../services/finance.service.js";

export default {
  name: "banks",
  components: {},

  data() {
    return {
      banks: [],
      bank: new Bank({}),
      dialogVisible: false,
      financeService: new FinanceService()
    };
  },
  methods: {
    clear() {
      this.bank = new Bank({});
    },
    generateNewId() {
      if (!this.banks || this.banks.length === 0) {
        return '1';
      }
      const maxId = Math.max(...this.banks.map(bank => parseInt(bank.id, 10) || 0));
      return (maxId + 1).toString();
    },
    addBank() {
      const newId = this.generateNewId();
      this.bank.id = newId;
      this.financeService.create(this.bank).then(response => {
        let bank = new Bank(response.data);
        this.banks.push(bank);
        this.notifySuccessfulAction('Bank created successfully');
      }).catch(error => {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error creating bank: ${error.message}`,
          life: 3000
        });
      });

      this.dialogVisible = false;
      this.clear();
    },
    notifySuccessfulAction(message) {
      if (this.$toast) {
        this.$toast.add({severity: 'success', summary: 'Success', detail: message, life: 700});
      } else {
        console.log('Toast message:', message);
      }
    }
  }
};
</script>

<template>
  <pv-button label="Add Bank" @click="dialogVisible = true"/>
  <pv-dialog header="Bank Details" v-model:visible="dialogVisible">
    <pv-float-label>
      <label for="name">Bank Name</label>
      <pv-input-text id="name" v-model="bank.name"/>
    </pv-float-label>
    <pv-float-label>
      <label for="tea">Bank TEA</label>
      <pv-input-number id="tea" v-model="bank.tea"/>
    </pv-float-label>
    <pv-float-label>
      <label for="image">Bank image</label>
      <pv-input-text id="image" v-model="bank.image"/>
    </pv-float-label>

    <pv-button label="Save" @click="addBank"/>
  </pv-dialog>
</template>

<style scoped>
</style>