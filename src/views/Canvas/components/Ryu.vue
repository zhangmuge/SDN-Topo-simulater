<template>
  <div>
    <v-card>
      <v-app-bar>
        <h3 style="text-align: center">Ryu控制面板</h3>
      </v-app-bar>
      <v-main style="padding: 10px">
        <div class="d-flex justify-space-around">
          <v-btn class="ma-2" color="primary" :to="{ name: 'watchtopo' }" small>
            查看当前拓扑图</v-btn
          >
          <v-btn
            class="ma-2"
            color="primary"
            :to="{ name: 'watchrouter' }"
            small
            >查看拓扑中的交换机与流表</v-btn
          >
          <v-btn class="ma-2" color="primary" :to="{ name: 'add_flow' }" small
            >添加流表项</v-btn
          >
        </div>

        <div class="d-flex justify-space-around">
          <v-btn
            class="ma-2"
            color="primary"
            :to="{ name: 'delete_flow_by_id' }"
            small
            >删除指定交换机的所有流表</v-btn
          >
          <v-btn
            class="ma-2"
            color="primary"
            :to="{name:'pings'}"
            small
            >ping测试</v-btn>
          <v-btn
            class="ma-2"
            color="primary"
            small
            :to="{name:'mtd_ping'}"
            >MTD测试</v-btn>
          <!--          <v-btn :to="{ name: 'default_route' }" small>返回</v-btn>-->
        </div>
        <div class="d-flex justify-space-around">
          <v-btn
            class="ma-2"
            color="primary"
            :to="{name:'iperf'}"
            small>
            iperf流量测试
          </v-btn>
        </div>
      </v-main>
    </v-card>
  </div>
</template>

<script>
import { changePanel } from "@/api";

export default {
  name: "RyuPanel",
  data() {
    return {};
  },
  methods: {
    change_flag() {
      //控制显示Mininet还是Ryu面板
      if (this.flag === true) {
        changePanel().catch(() => {
          window.alert("创建失败！请重启拓扑Python文件");
          //如果创建失败就返回上一级路由
          this.$router.go(-1);
          this.flag = true;
        });
      }
      this.flag = !this.flag;
    },
  },
};
</script>

<style scoped></style>
