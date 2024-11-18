<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";
import { BillsService } from "../services/bills.service.js";

export default {
  name: "bill-create-and-edit.component",
  components: { CreateAndEdit },
  props: {
    bill: null,
    visible: Boolean
  },
  data() {
    return {
      submitted: false,
      billService: new BillsService()
    }
  },
  methods: {
    onCancelRequested() {
      this.$emit('cancel-requested');
    },
    async onSaveRequested() {
      this.submitted = true;
      const isUnique = await this.isNumUnique(this.bill.num);
      if (isUnique) {
        this.$emit('save-requested', this.bill);
      } else {
        console.error('Bill number must be unique');
      }
    },
    validateRuc() {
      if (this.bill.ruc && this.bill.ruc.toString().length > 11) {
        this.bill.ruc = parseInt(this.bill.ruc.toString().slice(0, 11));
      }
    },
    async isNumUnique(num) {
      try {
        const response = await this.billService.getByNum(num);
        return response.data.length === 0;
      } catch (error) {
        console.error('Error checking bill number uniqueness.');
        return false;
      }
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
            <pv-input-number
                id="ruc"
                v-model="bill.ruc"
                :min="10000000000"
                :max="99999999999"
                @input="validateRuc"
                :class="{'p-invalid': submitted && !bill.ruc }"
            />
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

        <div class="field mt-5">
          <pv-select-button v-model="bill.currency" :options="[{label: 'PEN', value: 'PEN'}, {label: 'USD', value: 'USD'}]"
                            option-label="label" option-value="value" :class="{'p-invalid': submitted && !bill.currency }"/>
        </div>

      </div>
    </template>
  </create-and-edit>

</template>

<style scoped>

</style>