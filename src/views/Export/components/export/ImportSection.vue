<template>
  <v-layout wrap>
    <v-flex xs12 sm4>
      <v-btn
        :disabled="working"
        outlined
        block
        color="primary"
        data-cy="import-empty"
        @click="importData(emptyProject)"
      >
        空拓扑图
      </v-btn>
    </v-flex>
    <v-flex xs12 sm4>
      <v-menu :disabled="working" bottom offset-y>
        <template #activator="{ on }">
          <v-btn :disabled="working" outlined block color="primary" v-on="on"
            >预设样例</v-btn
          >
        </template>
        <v-list>
          <v-list-item
            v-for="(example, i) in examples"
            :key="'example' + i"
            @click.stop
          >
            <v-list-item-title
              @click="importData(example.data)"
              v-text="example.title"
            />
          </v-list-item>
        </v-list>
      </v-menu>
    </v-flex>
    <v-flex xs12 sm4>
      <v-btn
        :disabled="working"
        outlined
        block
        color="primary"
        @click="openFileChooser"
      >
        导入文件
      </v-btn>
    </v-flex>

    <div style="height: 0; width: 0; overflow: hidden">
      <input
        ref="fileInput"
        :accept="importAccept"
        type="file"
        @input="retrieveFile"
        @change="retrieveFile"
      />
    </div>
  </v-layout>
</template>

<script>
import importScript from "@/importScript";
import scriptImportWarning from "./scriptImportWarning.txt";
import { mapGetters } from "vuex";

import exampleEmpty from "@/examples/empty.json";
import exampleMedium1C from "@/examples/medium_1_controller.json";
import exampleMedium2C from "@/examples/medium_2_controllers.json";
import exampleTiny from "@/examples/tiny.json";
import exampleTinyController from "@/examples/tiny_controller.json";
import exampleTinyMininetConf from "@/examples/tiny_mininet_conf.json";
import exampleTinyPhysicalInterface from "@/examples/tiny_physical_interface.json";
import exampleTinyTC from "@/examples/tiny_tc.json";

export default {
  name: "ImportSection",
  data: () => ({
    emptyProject: exampleEmpty,
    examples: [
      {
        title: "简易拓扑且无控制器",
        data: exampleTiny,
      },
      {
        title: "简易拓扑带控制区",
        data: exampleTinyController,
      },
      {
        title: "简易拓扑与物理接口",
        data: exampleTinyPhysicalInterface,
      },
      {
        title: "简易拓扑与拥塞控制",
        data: exampleTinyTC,
      },
      {
        title: "简易拓扑与Mininet设置",
        data: exampleTinyMininetConf,
      },
      {
        title: "标准拓扑与1个控制器",
        data: exampleMedium1C,
      },
      {
        title: "标准拓扑与2个控制器",
        data: exampleMedium2C,
      },
    ],
  }),
  computed: {
    ...mapGetters("topology", ["data"]),
    working: {
      get() {
        return !!this.$store.state.working;
      },
      set(value) {
        if (value) {
          this.$store.commit("clearAlert");
        }
        this.$store.commit("setWorking", { working: !!value });
      },
    },
    importers() {
      function json(json) {
        return { data: JSON.parse(json), log: [] };
      }
      function python(script) {
        return importScript(script);
      }
      return {
        ".json": json,
        ".py": python,
        "application/json": json,
        "application/x-python-code": python,
        "text/x-python": python,
        json,
        python,
      };
    },
    importAccept() {
      return Object.keys(this.importers)
        .filter((key) => /(^.|\/)/.test(key))
        .join(",");
    },
  },
  methods: {
    showAlert(type, text) {
      this.$store.commit("setAlert", { type, text });
    },
    openFileChooser() {
      const input = this.$refs.fileInput;
      input.click();
    },
    retrieveFile() {
      const input = this.$refs.fileInput;
      const file = input.files[0];
      input.value = "";

      // Some browsers emit input, some change and some both.
      // Return if the file was already collected by the other event handler.
      if (!file) {
        return;
      }

      this.working = true;

      const fr = new FileReader();
      fr.readAsBinaryString(file);
      fr.onloadend = async () => {
        try {
          const stringToImport =
            this.importers[file.type] ||
            this.importers[file.name.replace(/^.*(?=\.)/, "")];
          if (stringToImport) {
            const str = fr.result;
            const { data, log } = stringToImport(str);
            this.$emit("log", log);
            if (stringToImport === this.importers.python) {
              await this.confirmImport(data, scriptImportWarning);
            } else {
              await this.confirmImport(data);
            }
          } else {
            this.showAlert("error", `Unknown file format: “${file.type}”.`);
          }
        } catch (error) {
          console.error(error);
          this.showAlert("error", "导入失败");
        } finally {
          this.working = false;
        }
      };
    },
    async importData(data) {
      this.working = true;
      await this.confirmImport(data);
      this.working = false;
    },
    async confirmImport(importData, text) {
      const confirmed = await this.$confirm(
        (text || "") +
          "<p>这会<strong>清空你当前的所有拓扑图操作</strong> <br/>是否确定导入拓扑文件？</p>",
        {
          buttonFalseText: "取消",
          buttonTrueText: "确定导入",
          icon: this.$vuetify.icons.warning,
          title: "警告",
          width: 600,
        }
      );
      if (confirmed) {
        this.$store.commit("topology/importData", importData);
        this.showAlert("success", "成功导入");
      } else {
        this.showAlert("info", "导入取消");
      }
    },
  },
};
</script>
