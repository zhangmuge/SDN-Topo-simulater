<template>
  <div id="gauge" :style="{ width: '300px', height: '300px' }"></div>
</template>
<script>
export default {
  name: "EchartsGauge",
  data() {
    return {};
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.chart = this.$echarts.init(document.getElementById("gauge"));
      const option = {
        series: [
          {
            type: "gauge",
            progress: {
              show: true,
              width: 18,
            },
            axisLine: {
              lineStyle: {
                width: 18,
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              length: 15,
              lineStyle: {
                width: 2,
                color: "#999",
              },
            },
            axisLabel: {
              distance: 25,
              color: "#999",
              fontSize: 15,
            },
            anchor: {
              show: true,
              showAbove: true,
              size: 25,
              itemStyle: {
                borderWidth: 10,
              },
            },
            title: {
              show: false,
            },
            detail: {
              valueAnimation: true,
              fontSize: 40,
              offsetCenter: [0, "70%"],
            },
            data: [
              {
                value: 70,
              },
            ],
          },
        ],
      };
      this.chart.setOption(option);
    },
  },
};
</script>
<style></style>
