<template>
  <div id="radar" :style="{ width: '300px', height: '300px' }"></div>
</template>
<script>
export default {
  name: "EchartsRadar",
  data() {
    return {};
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.chart = this.$echarts.init(document.getElementById("radar"));
      const option = {
        radar: [
          {
            indicator: [
              { text: "内存平均使用率", max: 100 },
              { text: "单位\n络流量\n最大值", max: 100 },
              { text: "内存\n使用率", max: 100 },
              { text: "单位网络流量平均值", max: 100 },
              { text: "危险\n系数", max: 100 },
              { text: "预警\n系数", max: 100 },
            ],
            radius: 80,
            center: ["50%", "60%"],
          },
        ],
        series: [
          {
            type: "radar",
            tooltip: {
              trigger: "item",
            },
            areaStyle: {},
            data: [
              {
                value: [60, 73, 85, 40, 64, 12],
                name: "A Software",
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
