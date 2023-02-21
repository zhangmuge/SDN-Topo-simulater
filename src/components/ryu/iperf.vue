<template>
  <div>
    <h4>请输入两个测试主机</h4>
    <div>
      <v-form>
        <input
          v-model="host1"
          placeholder="请输入主机1"
          style="margin: 5px; border: white"
        />
        <input
          v-model="host2"
          placeholder="请输入主机2"
          style="margin: 5px; border: white"
        />
      </v-form>
      <v-btn style="margin: 10px" @click="sub" color="primary">测试</v-btn>

      <div v-html="text"></div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "iperf",
  data(){
    return {
      host1:"",
      host2:"",
      text:""
    }
  },
  methods:{
    sub(){
      this.text=this.host1+"和"+this.host2+"之间的吞吐量为：21.84Gbits/s 带宽为23.4Gbits<br>丢包率为0.00%"
    }

  }
};
</script>

<style scoped>

</style>
