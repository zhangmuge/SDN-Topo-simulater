<template>
  <div>
    <div>
      <v-simple-table>
        <thead>
        <tr>
          <th>dpid(点击交换机即可删除)</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="id in dpid" :key="id">
          <!--          用了一个v-for循环去遍历函数获取的dpid并显示在表格内-->
          <a class="link" @click="deleteflow(id)">
            <th>{{ id }}</th>
          </a>
        </tr>
        <tr>
          <th>当前拓扑共有：{{ dpid.length }}台交换机</th>
        </tr>
        </tbody>
      </v-simple-table>
    </div>
    <a class="ma-2 grey--text" @click="getdpid">刷新</a>
  </div>
</template>

<script>

export default {
  name: "DeleteAllFlowEntries",
  data() {
    return {
      dpid: []
    };
  },
  created() {
    this.getdpid(); //created()用于在调用组件时候初始化，这里初始化下面methods里面定义的getdpid函数，作用是在调用时获取所有交换机id
  },
  methods: {
    getdpid() {
      //使用axios注册的$http来发送get请求，并用变量res接收，赋给数组dpid以便在h5代码里面调用
      //这里调用的是ryu的获取交换机api，完整地址为http://localhost:8080/stats/switches
      this.$axios.get("http://myc4project:4455/stats/switches").then((res) => {
        this.dpid = res.data;
      });
    },
    deleteflow(id) {
      this.$axios.get("http://myc4project:4455/stats/flowentry/clear/" + id).then(() => {
        alert("删除成功！");
      });
    }
  }
};
</script>

<style scoped>
.link {
  /*route-link是渲染为默认a标签，会破坏原来的美观，需要修改*/
  padding: 8px;
  line-height: 1.42857143;
  vertical-align: top;
  border-top: 1px solid #ddd;
  cursor: pointer;
}
</style>
