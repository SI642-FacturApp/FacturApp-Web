<script>
import {Bill} from "../model/bill.entity.js";
import {BillsService} from "../services/bills.service.js";
import DataManager from "../../shared/components/data-manager.component.vue";
import BillCreateAndEdit from "../components/bill-create-and-edit.component.vue";

export default {
  name: "bills-management",
  components: {BillCreateAndEdit, DataManager},

  data() {
    return {
      title: {singular: "Bill", plural: "Bills"},
      bills: [],
      bill: new Bill({}),
      selectedBills: [],
      billService: null,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      submitted: false
    }
  },
  methods: {
    notifySuccessfulAction(message) {
      this.$toast.add({severity: 'success', summary: 'Success', detail: message, life: 700});
    },
    findIndexById(id) {
      return this.bills.findIndex(bill => bill.id === id);
    },
    // Event Handlers
    onNewBill() {
      this.bill = new Bill({});
      this.isEdit = false;
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
      if (this.bill.name.trim()) {
        if (bill.id) {
          this.updateBill();
        } else {
          this.createBill();
        }
        this.createAndEditDialogIsVisible = false;
        this.isEdit = false;
      }
    },

    // Service client methods
    createBill() {
      this.billService.create(this.bill).then(response => {
        let bill = new Bill(response.data);
        this.bills.push(bill);
        this.notifySuccessfulAction('Bill created successfully');
      }).catch(error => {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error creating bill: ${error.message}`,
          life: 3000
        });
      })
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
      this.billService.delete(this.bill.id).then(() =>{
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
      })
    },
    deleteSelectedBills() {
      this.selectedBills.forEach((bill) => {
        this.billService.delete(bill.id).then(() => {
          this.bills = this.bills.filter(b => b.id !== bill.id);
        });
      });
      this.notifySuccessfulAction('Bills deleted successfully');
    },
    created() {
      this.billService = new BillsService();
      this.billService.getAll().then(response => {
        this.bills = response.data.map(bill => new Bill(bill));
      }).catch(error => {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error fetching bills: ${error.message}`,
          life: 3000
        });
      });
    }
  }
}
</script>

<template>
  <div>
    <!-- Toolbar Section -->
    <data-manager
        :title="title"
        :items="bills"
        @new-item-requested="onNewBill"
        @edit-item-requested="onEditBill"
        @delete-item-requested="onDeleteBill"
        @delete-selected-items-requested="onDeleteSelectedBills">
        <template #custom-columns>
        <pv-column :sortable="true" field="id" header="Id" style="min-width: 10rem" class="bg-gray-100" />
        <pv-column :sortable="true" field="name" header="Nombre" style="min-width: 10rem" />
        <pv-column :sortable="true" field="ruc" header="RUC" style="min-width: 10rem" />
        <pv-column :sortable="true" field="type" header="Tipo" style="min-width: 10rem" />
        <pv-column :sortable="true" field="num" header="N° Comprobante" style="min-width: 10rem" />
        <pv-column :sortable="true" field="emission_date" header="Fecha de Emisión" style="min-width: 10rem" />
        <pv-column :sortable="true" field="expiration_date" header="Fecha de Vencimiento" style="min-width: 10rem" />
        <pv-column :sortable="true" field="status" header="Estado" style="min-width: 10rem" />
        <pv-column :sortable="true" field="amount" header="Monto" style="min-width: 10rem" />
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
  </div>

</template>

<style scoped>

</style>