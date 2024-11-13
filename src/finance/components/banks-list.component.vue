<script>
import { FinanceService } from "../services/finance.service.js";

export default {
  name: "banks-list",
  data() {
    return {
      banks: [],
      financeService: new FinanceService()
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
          </div>
        </template>
      </pv-card>
    </div>
  </div>
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