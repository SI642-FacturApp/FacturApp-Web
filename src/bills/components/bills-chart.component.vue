<script>
export default {
  name: "bills-chart",
  props: {
    bills: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chartData: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  methods: {
    setChartData() {
      //First, get an array of all bill names
      const billNames = this.bills.map(bill => bill.name);
      console.log(billNames)
      //Second, get the sum of all amount values
      const totalAmount = this.bills.reduce((sum, bill) => sum + parseFloat(bill.amount), 0);

      // Finally, calculate the percentage of each bill amount
      const calculatedValues = this.bills.map(bill => (parseFloat(bill.amount) / totalAmount) * bill.tcea);
      console.log(calculatedValues)

      return {
        labels: billNames,
        datasets: [
          {
            data: calculatedValues
          }
        ]
      }
    }
  },
  watch: {
    bills: {
      handler() {
        this.chartData = this.setChartData();
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.chartData = this.setChartData();
  }
}
</script>

<template>
  <div>
    <pv-chart type="pie" :data="chartData" :options="chartOptions"/>
  </div>
</template>

<style scoped>

</style>