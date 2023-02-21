<template>
  <div>
    <div>
      <div>
        <div>
          <h4>请上传JSON文件</h4>
        </div>
      </div>
      <div>
        <el-upload
          action="/"
          accept=".json"
          :on-change="submitflow"
        ></el-upload>
      </div>
      <div>
        <v-btn class="ma-2 white--text" color="primary" @click="sub"
          >提交</v-btn
        >
      </div>
    </div>
  </div>
</template>
<script>
import { submitFlow } from "@/api/ryu";
export default {
  name: "AddFlowByFile",
  data() {
    return {
      flowInfo: "",
    };
  },
  methods: {
    submitflow(file) {
      let reader = new FileReader();
      reader.readAsText(file.raw, "UTF-8");
      if (typeof FileReader === "undefined") {
        alert("浏览器不支持上传文件");
        return;
      }
      reader.onload = (e) => {
        this.flowInfo = e.target.result;
      };
    },
    sub() {
      submitFlow(this.flowInfo)
        .then((res) => {
          if (res.status === 200) {
            window.alert("流表添加成功！");
          }
        })
        .catch(() => {
          window.alert("添加失败！请检查交换机id，格式等是否正确！");
        });
      // window.console.log(this.flowInfo)
    },
  },
};
</script>

<style></style>
