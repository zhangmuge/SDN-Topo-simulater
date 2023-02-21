<template>
  <v-container>
    <v-card>
      <v-row>
        <echarts-radar></echarts-radar>
        <echarts-diagram></echarts-diagram>
      </v-row>
    </v-card>
    <echarts-gauge></echarts-gauge>
  </v-container>
</template>

<script>
import EchartsRadar from "./components/EchartsRadar";
import EchartsGauge from "@/views/About/components/EchartsGauge";
import EchartsDiagram from "@/views/About/components/EchartsDiagram";
export default {
  name: "AboutPage",
  components: { EchartsDiagram, EchartsGauge, EchartsRadar },
};
</script>
