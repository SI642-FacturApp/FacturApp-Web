<script>
import { FinanceService } from "../services/finance.service.js";
import { BillsService } from "../../bills/services/bills.service.js";
import { Button as PvButton, DatePicker as PvInputDate, Dialog as PvDialog, Select as PvSelect } from "primevue";

export default {
  name: "banks-list",
  components: { PvInputDate, PvSelect, PvDialog, PvButton },
  data() {
    return {
      banks: [],
      financeService: new FinanceService(),
      billService: new BillsService(),
      dialogVisible: false,
      deleteDialogVisible: false,
      selectedBank: null,
      billsDialog: false,
      bills: [], // Add bills array to store all bills
      selectedBill: null, // Add selectedBill to store the selected bill
      bankDate: null,
      overviewDialog: false,


      differenceMs: 0,
      differenceDays: 0,
      te: 0,
      discount: 0,
      value: 0,
      tempValue: 0,
      bCosts: 0,
      tea: 0,
      tcea: 0
    };
  },
  created() {
    this.fetchBanks();
    this.fetchBills(); // Fetch bills when component is created
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
    async fetchBills() {
      try {
        const response = await this.billService.getAll(); // Assuming getAllBills method exists
        this.bills = response.data;
      } catch (error) {
        console.error('Error fetching bills:', error);
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
    },
    giveBillRequest(bank) {
      this.selectedBank = bank;
      this.billsDialog = true;
      console.log('Bill requested for bank:', bank);
    },
    giveBillOverview(bank) {
      if (this.selectedBill && this.bankDate) {
        const selectedBillObj = this.bills.find(bill => bill.id === this.selectedBill);
        if (selectedBillObj) {
          const billDate = new Date(selectedBillObj.expiration_date);
          const bankDate = new Date(this.bankDate);

          if (!isNaN(billDate) && !isNaN(bankDate)) {
            this.differenceMs = Math.abs(bankDate - billDate);
            this.differenceDays = Math.ceil(this.differenceMs / (1000 * 60 * 60 * 24));

            console.log(`ID: ${bank.id}`);
            console.log(`TEA: ${bank.te}`);

            if(bank.te !== 0 && bank.m !== 360) {
              this.tea = (1 + (bank.te / 100)) ** (360 / bank.m);
            } else {
              this.tea = bank.te
            }


            if(bank.tn !== 0){
              this.tea = (1 + ((bank.tn / 100 )/ bank.m)) ** (bank.n);
            }

            this.te = (1 + (this.tea / 100)) ** (this.differenceDays / 360) - 1;
            console.log(`TE: ${this.te * 100}`);

            this.discount = (this.te / (this.te + 1));
            console.log(`Discount: ${this.discount * 100}`);

            this.tempValue = (selectedBillObj.amount * (1 - this.discount));
            console.log(`Temp Value: ${this.tempValue}`);

            if(selectedBillObj.currency === 'USD') {
              this.bCosts = bank.costs / 3.8;
              this.value = (this.tempValue - this.bCosts);
            } else {
              this.value = (this.tempValue - bank.costs);
            }

            console.log(`Value: ${this.value}`);

            this.tcea = (selectedBillObj.amount / this.value) ** (360 / this.differenceDays) - 1;
            console.log(`TCEA: ${this.tcea * 100}`);

            console.log(`Number of days between the selected bill date and bank date: ${this.differenceDays}`);
          } else {
            console.error('Invalid date format');
          }

          this.overviewDialog = true;
        }
      }
    },
    async giveBill(bank) {
      try {
        const updatedBill = await this.billService.updateStatus(this.selectedBill, bank.name, this.value, this.tcea);
        this.selectedBill.status = updatedBill.status;
        console.log('Bill status updated successfully');
        this.billsDialog = false;
      } catch (error) {
        console.error('Error updating bill status:', error);
      }

      this.resetValues();
      console.log('Bill given');
      this.billsDialog = false;
    },
    cancelTransaction() {
      this.resetValues();
      this.billsDialog = false;
      this.overviewDialog = false;
    },
    resetValues() {
      this.differenceMs = 0;
      this.differenceDays = 0;
      this.te = 0;
      this.discount = 0;
      this.value = 0;
      this.tcea = 0;
    }
  },
  computed: {
    validatedBills() {
      return this.bills.filter(bill => bill.status === 'Validado').map(bill => ({
        label: bill.num,
        value: bill.id
      }));
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
            <p v-if="bank.tn !== 0">TN: {{ bank.tn }} %</p>
            <p v-if="bank.te !== 0">TE: {{ bank.te }} %</p>
            <p>Periodo: {{bank.m}} dias</p>
            <p v-if="bank.tn !== 0">Capitalizacion: {{bank.n}} dias</p>
            <pv-button label="Dar factura" @click="giveBillRequest(bank)"/>

            <pv-button label="Editar" severity="secondary" @click="openEditDialog(bank)"/>
            <pv-button label="Eliminar" severity="danger" @click="openDeleteDialog(bank)"/>
          </div>
        </template>
      </pv-card>
    </div>
  </div>

  <pv-dialog header="Seleccionar factura" v-model:visible="billsDialog">
    <pv-select v-model="selectedBill" :options="validatedBills" option-label="label" option-value="value"
               placeholder="Select a bill"/>
    <pv-input-date v-model="bankDate" placeholder="Select a date"/>
    <pv-button label="Levantar Factura" @click="giveBillOverview(selectedBank)"/>
    <pv-dialog header="Resumen de Factura" v-model:visible="overviewDialog">
      <p>Number of days between the selected bill date and bank date: {{ differenceDays }}</p>
      <p>TE: {{ te * 100 }} %</p>
      <p>Discount: {{ discount * 100 }} %</p>
      <p>Value: {{ value }}</p>
      <p>TCEA: {{ tcea * 100 }} %</p>
      <pv-button label="Levantar" @click="giveBill(selectedBank)"/>
      <pv-button label="Cancelar" @click="cancelTransaction"/>
    </pv-dialog>
  </pv-dialog>

  <pv-dialog header="Edit Bank Details" v-model:visible="dialogVisible">
    <pv-float-label>
      <label for="tna">Bank TNA</label>
      <pv-input-number id="tna" v-model="selectedBank.tn" />
    </pv-float-label>
    <pv-float-label>
      <label for="tea">Bank TEA</label>
      <pv-input-number id="tea" v-model="selectedBank.te" />
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