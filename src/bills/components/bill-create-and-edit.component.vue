<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";

export default {
  name: "bill-create-and-edit.component",
  components: {CreateAndEdit},
  props: {
    bill: null,
    visible: Boolean
  },
  data() {
    return {
      submitted: false
    }
  },
  methods: {
    onCancelRequested() {
      this.$emit('cancel-requested');
    },
    onSaveRequested() {
      this.submitted = true;
    }
  }
}
</script>

<template>

  <create-and-edit
      :entity="bill"
      :visible="visible"
      entity-name="Bill"
      @cancel-requested="onCancelRequested"
      @save-requested="onSaveRequested">
    <template #content>
      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label>
            <label for="name">Nombre</label>
            <pv-input-text id="name" v-model="bill.name"
                           :class="{'p-invalid': submitted && !bill.name }"/>
          </pv-float-label>
        </div>

        <div class="field mt-5">
        <pv-float-label>
          <label for="ruc">RUC</label>
          <pv-input-number id="ruc" v-model="bill.ruc"
                           :class="{'p-invalid': submitted && !bill.ruc }"/>
        </pv-float-label>
        </div>

        <div class="field mt-5">
          <pv-float-label>
            <label for="type">Tipo</label>
            <pv-input-text id="type" v-model="bill.type"
                           :class="{'p-invalid': submitted && !bill.type }"/>
          </pv-float-label>
        </div>

        <div class="field mt-5">
          <pv-float-label>
            <label for="num">N° Comprobante</label>
            <pv-input-text id="num" v-model="bill.num"
                           :class="{'p-invalid': submitted && !bill.num }"/>
          </pv-float-label>
        </div>

        <div class="field mt-5">
          <pv-float-label>
            <label for="emission_date">Fecha de Emisión</label>
            <pv-input-date id="emission_date" v-model="bill.emission_date"
                           :class="{'p-invalid': submitted && !bill.emission_date }"/>
          </pv-float-label>
        </div>

        <div class="field mt-5">
          <pv-float-label>
            <label for="expiration_date">Fecha de Vencimiento</label>
            <pv-input-date id="expiration_date" v-model="bill.expiration_date"
                           :class="{'p-invalid': submitted && !bill.expiration_date }"/>
          </pv-float-label>
        </div>

        <div class="field mt-5">
          <pv-float-label>
            <label for="amount">Monto</label>
            <pv-input-text id="amount" v-model="bill.amount"
                           :class="{'p-invalid': submitted && !bill.amount }"/>
          </pv-float-label>
        </div>

      </div>
    </template>
  </create-and-edit>

</template>

<style scoped>

</style>