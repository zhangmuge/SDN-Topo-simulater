<template>
<div>
  <h4>各主机的虚拟地址</h4>
  <h5>跳变周期默认为30秒</h5>
  <div v-html="ips"></div>
  <v-btn @click="get_ips" color="primary">刷新</v-btn>
</div>
</template>

<script>
export default {
  name: "mtd_ping",
  data(){
    return {
      ips:""
    }
  },
  created() {
    this.get_ips()
  },
  methods:{
    get_ips(){
      this.$axios.get("http://myc4project:5566/mtd_ping/h1").then((res)=>{
        this.ips=res.data
      })
    }
  }
};
</script>

<style scoped>

</style>
