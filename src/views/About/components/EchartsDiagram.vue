<template>
  <div id="diagram" :style="{ width: '400px', height: '300px' }"></div>
</template>
<script>
export default {
  name: "EchartsDiagram",
  data() {
    return {
      diagram: [1, 33, 44],
    };
  },
  mounted() {
    let _this = this;
    setTimeout(function () {
      _this.run();
      _this.initChart();
    }, 0);
    setInterval(function () {
      _this.run();
      _this.initChart();
    }, 3000);
  },
  methods: {
    run() {
      for (var i = 0; i < this.diagram.length; ++i) {
        if (Math.random() > 0.9) {
          this.diagram[i] += Math.round(Math.random() * 2000);
        } else {
          this.diagram[i] += Math.round(Math.random() * 200);
        }
      }
    },
    initChart() {
      this.chart = this.$echarts.init(document.getElementById("diagram"));
      const option = {
        xAxis: {
          max: "dataMax",
        },
        yAxis: {
          type: "category",
          data: ["A", "B", "C", "D", "E"],
          inverse: true,
          animationDuration: 300,
          animationDurationUpdate: 300,
          max: 2, // only the largest 3 bars will be displayed
        },
        series: [
          {
            realtimeSort: true,
            name: "X",
            type: "bar",
            data: this.diagram,
            label: {
              show: true,
              position: "right",
              valueAnimation: true,
            },
          },
        ],
        legend: {
          show: true,
        },
        animationDuration: 0,
        animationDurationUpdate: 3000,
        animationEasing: "linear",
        animationEasingUpdate: "linear",
      };
      this.chart.setOption(option);
    },
  },
};
</script>
<style></style>
