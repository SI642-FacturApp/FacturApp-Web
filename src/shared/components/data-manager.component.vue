<script>
import { FilterMatchMode } from '@primevue/core/api';
export default {
  name: "data-manager",
  inheritAttrs: false,
  props: {
    items: {type: Array, required: true},
    title: {type: {singular: '', plural: ''}, required: true},
    dynamic: {type: Boolean, default: false},
    columns: {type: Array, default: () => []}
  },
  data() {
    return {
      selectedItems: [],
      filters: null
    }
  },
  methods:
      {
        initFilters() {
          this.filters = { global: { value: null, matchMode: FilterMatchMode.CONTAINS } };
        },
        newItem() {
          this.$emit('new-item-requested');
        },
        confirmDeleteSelected() {
          this.$confirm.require( {
            message:      `Are you sure you want to delete the selected ${this.title.plural}?`,
            header:       'Confirmation',
            icon:         'pi pi-exclamation-triangle',
            rejectClass:  'p-button-secondary p-button-outlined',
            rejectLabel:  'Cancel',
            acceptLabel:  'Delete',
            acceptClass:  'p-button-danger',
            accept:       () => this.$emit('delete-selected-items-requested', this.selectedItems),
            reject:       () => {}
          });
        },
        exportToCsv() {
          this.$refs.dt.exportCSV();
        },
        editItem(item) {
          this.$emit('edit-item-requested', item);
        },
        confirmDeleteItem(item) {
          this.$confirm.require( {
            message:      `Are you sure you want to delete this ${this.title.singular}?`,
            header:       'Confirmation',
            icon:         'pi pi-exclamation-triangle',
            rejectClass:  'p-button-secondary p-button-outlined',
            rejectLabel:  'Cancel',
            acceptLabel:  'Delete',
            acceptClass:  'p-button-danger',
            accept:       () => this.$emit('delete-item-requested', item),
            reject:       () => {}
          });
        }
      },
  created() {
    this.initFilters();
  }
}
</script>

<template >
  <h3> Manage {{ title.plural }}</h3>
  <!-- Toolbar Section -->
  <pv-toolbar class="mb-2 bg-gray-300">
    <template #end>
      <pv-button class="mr-2 bg-blue-500" icon="pi pi-plus" label="New" severity="success" @click="newItem"/>
      <pv-button class="mr-2 bg-red-500" :disabled="!selectedItems || !selectedItems.length" icon="pi pi-trash" label="Delete"
                 severity="danger" @click="confirmDeleteSelected"/>
    </template>

  </pv-toolbar>

  <!-- Data Table Section -->
  <pv-data-table

      ref="dt"
      v-model:selection="selectedItems"
      :filters="filters"
      :paginator="true"
      :rows="10"
      :rows-per-page-options="[10,20,30]"
      :value="items"
      current-page-report-template="Showing {first} to {last} of {totalRecords} ${{ title.plural }}"
      data-key="id"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"

  >

    <pv-column :exportable="false" selection-mode="multiple" class="bg-gray-100"  style="width: 3rem" />
    <slot name="custom-columns" ></slot>
    <pv-column v-if="dynamic" v-for="column in columns" :key="column.field"
               :field="column.field"
               :header="column.header" />
    <pv-column :exportable="false" class="bg-gray-100" style="min-width: 8rem">
      <template #body="slotProps">
        <pv-button icon="pi pi-pencil" outlined rounded class="mr-2 text-orange-500 border-orange-500 border-2" @click="editItem(slotProps.data)" />
        <pv-button icon="pi pi-trash" outlined rounded class="mr-2 text-red-500 border-red-500 border-2 " severity="danger" @click="confirmDeleteItem(slotProps.data)"/>
      </template>
    </pv-column>
  </pv-data-table>

</template>

<style scoped>


</style>