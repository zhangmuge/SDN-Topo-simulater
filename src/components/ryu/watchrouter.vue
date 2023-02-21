<template>
  <div>
    <div>
      <v-simple-table>
        <thead>
          <tr>
            <th>dpid(点击dpid可查看交换机中的流表)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="id in dpid" :key="id">
            <!--          用了一个v-for循环去遍历函数获取的dpid并显示在表格内-->
            <router-link
              :to="{ name: 'watchflow', params: { id: id } }"
              class="link"
            >
              <th>{{ id }}</th>
            </router-link>
          </tr>
          <tr>
            <th>当前拓扑共有：{{ dpid.length }}台交换机</th>
          </tr>
        </tbody>
      </v-simple-table>
    </div>
    <v-btn class="ma-2" color="primary" @click="getdpid">提交</v-btn>
  </div>
</template>

<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Watchrouter",
  data() {
    return {
      dpid: [],
    };
  },
  created() {
    this.getdpid(); //created()用于在调用组件时候初始化，这里初始化下面methods里面定义的getdpid函数，作用是在调用时获取所有交换机id
  },
  methods: {
    getdpid() {
      //使用axios注册的$http来发送get请求，并用变量res接收，赋给数组dpid以便在h5代码里面调用
      //这里调用的是ryu的获取交换机api，完整地址为http://localhost:8080/stats/switches
      this.$axios
        .get("http://myc4project:4455/stats/switches")
        .then((res) => {
          this.dpid = res.data;
        });
    },
  },
};
</script>

<style scoped>
.link {
  /*route-link是渲染为默认a标签，会破坏原来的美观，需要修改*/
  padding: 8px;
  line-height: 1.42857143;
  vertical-align: top;
  border-top: 1px solid #ddd;
}
</style>
