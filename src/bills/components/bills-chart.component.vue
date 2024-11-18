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
      //Second, get an array of all tcea values
      const tceaValues = this.bills.map(bill => bill.tcea);
      console.log(tceaValues)

      return {
        labels: billNames,
        datasets: [
          {
            data: tceaValues
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