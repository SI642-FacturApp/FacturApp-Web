<script>
import { Bill } from "../model/bill.entity.js";
import { BillsService } from "../services/bills.service.js";
import DataManager from "../../shared/components/data-manager.component.vue";
import BillCreateAndEdit from "../components/bill-create-and-edit.component.vue";
import { SelectButton as PvSelectButton } from "primevue";
import { useAccountStore } from "../../stores/account.store.js";
import BillsChart from "../components/bills-chart.component.vue";

export default {
  name: "bills-management",
  components: {BillsChart, PvSelectButton, BillCreateAndEdit, DataManager },

  data() {
    return {
      title: { singular: "Bill", plural: "Bills" },
      bills: [],
      accountStore: useAccountStore(),
      bill: new Bill({}),
      selectedBills: [],
      billService: null,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      submitted: false,
      selectedCurrency: 'PEN' // Default selected currency
    };
  },
  computed: {
    filteredBills() {
      return this.bills.filter(bill => bill.currency === this.selectedCurrency);
    }
  },
  methods: {
    notifySuccessfulAction(message) {
      if (this.$toast) {
        this.$toast.add({ severity: 'success', summary: 'Success', detail: message, life: 700 });
      } else {
        console.log('Toast message:', message);
      }
    },
    findIndexById(id) {
      return this.bills.findIndex(bill => bill.id === id);
    },
    generateNewId() {
      if (!this.bills || this.bills.length === 0) {
        return '1';
      }
      const maxId = Math.max(...this.bills.map(bill => parseInt(bill.id, 10) || 0));
      return (maxId + 1).toString();
    },
    // Event Handlers
    onNewBill() {
      this.bill = new Bill({});
      this.isEdit = false;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
      console.log(this.createAndEditDialogIsVisible);
    },
    onEditBill(bill) {
      this.bill = new Bill(bill);
      this.isEdit = true;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },
    onDeleteBill(bill) {
      this.bill = new Bill(bill);
      this.deleteBill();
    },
    onDeleteSelectedBills(selectedBills) {
      this.selectedBills = selectedBills;
      this.deleteSelectedBills();
    },
    onCancelRequested() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },
    onSaveRequested(bill) {
      console.log('onSaveRequested');
      this.submitted = true;
      if (bill && bill.name.trim()) {
        if (bill.id) {
          this.updateBill();
        } else {
          this.createBill();
        }
        this.createAndEditDialogIsVisible = false;
        this.isEdit = false;
      } else {
        console.error('Bill object is undefined or missing required properties');
      }
    },
    // Service client methods
    createBill() {
      this.bill.status = 'Validado';
      this.bill.userId = this.accountStore.userId;
      this.billService.create(this.bill).then(response => {
        let bill = new Bill( {...response.data, userId: this.accountStore.userId} );
        this.bills.push(bill);
        this.notifySuccessfulAction('Bill created successfully');
      }).catch(error => {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error creating bill: ${error.message}`,
          life: 3000
        });
      });
    },
    updateBill() {
      this.billService.update(this.bill.id, this.bill).then(response => {
        let index = this.findIndexById(this.bill.id);
        this.bills[index] = new Bill(response.data);
        this.notifySuccessfulAction('Bill updated successfully');
      }).catch(error => {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error updating bill: ${error.message}`,
          life: 3000
        });
      });
    },
    deleteBill() {
      this.billService.delete(this.bill.id).then(() => {
        let index = this.findIndexById(this.bill.id);
        this.bills.splice(index, 1);
        this.notifySuccessfulAction('Bill deleted successfully');
      }).catch(error => {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error deleting bill: ${error.message}`,
          life: 3000
        });
      });
    },
    deleteSelectedBills() {
      this.selectedBills.forEach((bill) => {
        this.billService.delete(bill.id).then(() => {
          this.bills = this.bills.filter((b) => b.id !== bill.id);
        });
      });
      this.notifySuccessfulAction('Bills deleted successfully');
    },
    onOptionChange() {
      // This method is triggered when the selected currency changes
      console.log('Selected currency:', this.selectedCurrency);
    }
  },
  created() {
    this.billService = new BillsService();
    this.billService.getAll().then(response => {
      this.bills = response.data
          .filter(bill => bill.userId === this.accountStore.userId)
          .map(bill => new Bill(bill));
      console.log(this.bills);
    }).catch(error => {
      this.$toast.add({
        severity: 'error',
        summary: 'Error',
        detail: `Error fetching bills: ${error.message}`,
        life: 3000
      });
    });
  }
};
</script>

<template>
  <div>
    <pv-select-button :options="[{label: 'PEN', value: 'PEN'}, {label: 'USD', value: 'USD'}]"
                      v-model="selectedCurrency" option-label="label" option-value="value" @change="onOptionChange"/>
    <!-- Toolbar Section -->
    <data-manager
        :title="title"
        :items="filteredBills"
        @new-item-requested="onNewBill"
        @edit-item-requested="onEditBill"
        @delete-item-requested="onDeleteBill"
        @delete-selected-items-requested="onDeleteSelectedBills">
      <template #custom-columns>
        <pv-column :sortable="true" field="name" header="Nombre" style="min-width: 10rem"/>
        <pv-column :sortable="true" field="ruc" header="RUC" style="min-width: 10rem"/>
        <pv-column :sortable="true" field="type" header="Tipo" style="min-width: 10rem"/>
        <pv-column :sortable="true" field="num" header="N° Comprobante" style="min-width: 10rem"/>
        <pv-column :sortable="true" field="emission_date" header="Fecha de Emisión" style="min-width: 10rem"/>
        <pv-column :sortable="true" field="expiration_date" header="Fecha de Vencimiento" style="min-width: 10rem"/>
        <pv-column :sortable="true" field="status" header="Estado" style="min-width: 10rem"/>
        <pv-column :sortable="true" field="amount" header="Monto" style="min-width: 10rem"/>
        <pv-column :sortable="true" field="tcea" header="TCEA" style="min-width: 10rem"/>
      </template>
    </data-manager>
    <!-- Create and Edit Dialog -->
    <bill-create-and-edit
        :edit="isEdit"
        :bill="bill"
        :visible="createAndEditDialogIsVisible"
        @cancel-requested="onCancelRequested"
        @save-requested="onSaveRequested">
    </bill-create-and-edit>
    <bills-chart :bills="filteredBills"/>
  </div>
</template>

<style scoped>
/* Add any necessary styles here */
</style>