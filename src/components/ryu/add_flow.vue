<template>
  <div>
    <div>
      <label>添加流表项</label>
      <div>
        <textarea
          v-model="flow"
          style="border: 1px solid grey"
          placeholder="请以JSON格式输入流表"
          rows="7"
        ></textarea>
      </div>
      <v-btn class="ma-2 white--text" color="primary" @click="submit_flow"
        >提交</v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "AddFlow",
  data() {
    return {
      flow: "",
    };
  },
  methods: {
    submit_flow() {
      this.$axios.post("http://myc4project:4455/stats/flowentry/add",this.flow)
        .then((res) => {
          if (res.status === 200) {
            window.alert("流表添加成功！");
          }
        })
        .catch(() => {
          window.alert("添加失败！请检查交换机id，格式等是否正确！");
        });
    },
  },
};
</script>

<style scoped></style>
