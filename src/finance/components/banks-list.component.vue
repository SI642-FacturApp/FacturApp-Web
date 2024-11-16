<script>
import { FinanceService } from "../services/finance.service.js";

export default {
  name: "banks-list",
  data() {
    return {
      banks: [],
      financeService: new FinanceService(),
      dialogVisible: false,
      deleteDialogVisible: false,
      selectedBank: null
    };
  },
  created() {
    this.fetchBanks();
  },
  methods: {
    async fetchBanks() {
      try {
        const response = await this.financeService.getAll();
        console.log('Fetched banks:', response.data); // Log the fetched data
        this.banks = response.data;
      } catch (error) {
        console.error('Error fetching banks:', error);
      }
    },
    openEditDialog(bank) {
      this.selectedBank = { ...bank };
      this.dialogVisible = true;
    },
    async saveChanges() {
      try {
        await this.financeService.update(this.selectedBank.id, this.selectedBank);
        this.dialogVisible = false;
        await this.fetchBanks(); // Refresh the list
      } catch (error) {
        console.error('Error saving changes:', error);
      }
    },
    openDeleteDialog(bank) {
      this.selectedBank = bank;
      this.deleteDialogVisible = true;
    },
    async confirmDelete() {
      try {
        await this.financeService.delete(this.selectedBank.id);
        this.deleteDialogVisible = false;
        await this.fetchBanks(); // Refresh the list
      } catch (error) {
        console.error('Error deleting bank:', error);
      }
    },
    cancelDelete() {
      this.deleteDialogVisible = false;
    }
  }
}

</script>

<template>
  <div class="banks-list">
    <div v-for="bank in banks" :key="bank.id" class="bank-card">
      <pv-card>
        <template #header>
          <img :src="bank.image" alt="Bank Image" class="bank-image"/>
        </template>
        <template #content>
          <div class="bank-details">
            <h2>{{ bank.name }}</h2>
            <p v-if="bank.tna !== 0">TNA: {{ bank.tna }} %</p>
            <p v-if="bank.tea !== 0">TEA: {{ bank.tea }} %</p>
            <pv-button label="Edit" @click="openEditDialog(bank)" />
            <pv-button label="Delete" @click="openDeleteDialog(bank)" />
          </div>
        </template>
      </pv-card>
    </div>
  </div>

  <pv-dialog header="Edit Bank Details" v-model:visible="dialogVisible">
    <pv-float-label>
      <label for="tna">Bank TNA</label>
      <pv-input-number id="tna" v-model="selectedBank.tna" />
    </pv-float-label>
    <pv-float-label>
      <label for="tea">Bank TEA</label>
      <pv-input-number id="tea" v-model="selectedBank.tea" />
    </pv-float-label>
    <pv-button label="Save" @click="saveChanges" />
  </pv-dialog>

  <pv-dialog header="Delete Bank" v-model:visible="deleteDialogVisible">
    <p>Do you really want to delete this bank?</p>
    <pv-button label="Confirm" @click="confirmDelete" />
    <pv-button label="Cancel" @click="cancelDelete" />
  </pv-dialog>
</template>

<style scoped>
.bank-card {
  width: 400px; /* Adjust the width as needed */
  height: 300px; /* Adjust the height as needed */
  margin-bottom: 20px; /* Add some space between cards */
}

.bank-image {
  width: 100%;
  height: auto;
}

.bank-details {
  padding: 10px; /* Add padding to ensure text is not too close to the edges */
}

.bank-details h2, .bank-details p {
  margin: 0; /* Remove default margins */
  padding: 5px 0; /* Add padding for spacing */
}
</style>