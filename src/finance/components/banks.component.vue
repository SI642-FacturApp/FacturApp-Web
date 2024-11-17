<script>
import {Bank} from "../model/bank.entity.js";
import {FinanceService} from "../services/finance.service.js";
import {v4 as uuidv4} from 'uuid';
import {Select as PvSelect, SelectButton as PvSelectButton} from "primevue";

export default {
  name: "banks",
  components: {PvSelect, PvSelectButton},

  data() {
    return {
      banks: [],
      bank: new Bank({}),
      dialogVisible: false,
      financeService: new FinanceService(),

      selectedType: null,
      teValue: null,
      tnValue: null,
      periodOptions: [
        { label: 'Anual', value: '360' },
        { label: 'Semestral', value: '180' },
        { label: 'Cuatrimestral', value: '120' },
        { label: 'Trimestral', value: '90' },
        { label: 'Bimestral', value: '60' },
        { label: 'Mensual', value: '30' },
        { label: 'Quincenal', value: '15' }
      ]
    };
  },
  methods: {
    clear() {
      this.bank = new Bank({});
    },
    generateNewId() {
      return uuidv4();
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
    <div class="field mt-5">
      <pv-float-label>
        <label for="name">Nombre del banco</label>
        <pv-input-text id="name" v-model="bank.name"/>
      </pv-float-label>
    </div>
    <div class="field mt-5">
      <pv-select-button
          v-model="selectedType"
          :options="[{ label: 'Tasa Efectiva', value: 'te' }, { label: 'Tasa Nominal', value: 'tn' }]"
          option-label="label" option-value="value"
      />
    </div>

    <div v-if="selectedType === 'tn'" class="field mt-5">
      <div class="field mt-5">
        <pv-float-label>
          <label for="tn">TN del banco</label>
          <pv-input-number id="tn" v-model="bank.tn"/>
        </pv-float-label>
      </div>

      <div class="field mt-5">
        <pv-select
            v-model="bank.m"
            :options="periodOptions"
            option-label="label"
            option-value="value"
            placeholder="Seleccionar periodo"
        />
      </div>

      <div class="field mt-5">
        <pv-select
            v-model="bank.n"
            :options="periodOptions"
            option-label="label"
            option-value="value"
            placeholder="Seleccionar capitalizacion"
        />
      </div>
    </div>


    <div v-if="selectedType === 'te'" class="field mt-5">

      <div class="field mt-5">
        <pv-float-label>
          <label for="te">TE del banco</label>
          <pv-input-number id="te" v-model="bank.te"/>
        </pv-float-label>
      </div>

        <div class="field mt-5">
          <pv-select
              v-model="bank.m"
              :options="periodOptions"
              option-label="label"
              option-value="value"
              placeholder="Seleccionar periodo"
          />

        </div>
      </div>

    <div class="field mt-5">
      <pv-float-label>
        <label for="costs">Otros costos</label>
        <pv-input-number id="costs" v-model="bank.costs"/>
      </pv-float-label>
    </div>

      <div class="field mt-5">
        <pv-float-label>
          <label for="image">Imagen del banco</label>
          <pv-input-text id="image" v-model="bank.image"/>
        </pv-float-label>
      </div>

      <pv-button label="Save" @click="addBank"/>
  </pv-dialog>
</template>

<style scoped>
</style>