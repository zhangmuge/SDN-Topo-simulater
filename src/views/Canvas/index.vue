<template>
  <div class="canvas-container">
    <LoadingSpinner v-if="loading !== false" />
    <template v-else>
      <template class="ryu">
        <v-navigation-drawer
          v-model="showPanel"
          absolute
          right
          hide-overlay
          stateless
          temporary
          style="width: 500px"
        >
          <br />
          <v-card>
            <router-view />
          </v-card>

          <template #prepend>
            <ryu></ryu>
          </template>
          <template #append>
            <v-btn
              :disabled="working"
              color="primary"
              class="ma-4"
              right
              @click.stop="showPanel = !showPanel"
              >CLOSE
            </v-btn>
          </template>
        </v-navigation-drawer>
      </template>
      <v-row style="height: 100%">
        <v-col cols="9">
          <v-card
            style="
              margin: 10px 0 10px 10px;
              height: 97%;
              border: 1px solid grey;
            "
          >
            <VisContainer ref="vis" @edit-item="editItem" />
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card
            style="
              margin: 10px 10px 10px 0;
              height: 97%;
              border: 1px solid grey;
            "
          >
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header> 网络构建</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-list-item>
                    <div class="topo-div">
                      <v-btn
                        :color="theme.edge.menu"
                        dark
                        title="Edge"
                        data-cy="fab-edge"
                        @click="$refs.vis.addEdge()"
                      >
                        <v-icon>$vuetify.icons.net-edge</v-icon>
                      </v-btn>
                      <p class="ma-0 font-weight-thin text-sm-body-2">线路</p>
                    </div>
                    <div class="topo-div">
                      <v-btn
                        :color="theme.port.menu"
                        dark
                        title="Port"
                        data-cy="fab-port"
                        @click="$refs.vis.addPort()"
                      >
                        <!--                        <v-icon>$vuetify.icons.net-port</v-icon>-->
                        <span class="iconfont icon-port"></span>
                      </v-btn>
                      <p class="ma-0 font-weight-thin text-sm-body-2">端口</p>
                    </div>
                  </v-list-item>
                  <v-list-item>
                    <div class="topo-div">
                      <v-btn
                        :color="theme.host.menu"
                        dark
                        title="Host"
                        data-cy="fab-host"
                        @click="$refs.vis.addHost()"
                      >
                        <!--                        <v-icon>$vuetify.icons.net-host</v-icon>-->
                        <span class="iconfont icon-host"></span>
                      </v-btn>
                      <p class="ma-0 font-weight-thin text-sm-body-2">主机</p>
                    </div>
                    <div class="topo-div">
                      <v-btn
                        :color="theme.switch.menu"
                        dark
                        title="Switch"
                        data-cy="fab-switch"
                        @click="$refs.vis.addSwitch()"
                      >
                        <!--                        <v-icon>$vuetify.icons.net-switch</v-icon>-->
                        <span class="iconfont icon-switch"></span>
                      </v-btn>
                      <p class="ma-0 font-weight-thin text-sm-body-2">交换机</p>
                    </div>
                  </v-list-item>
                  <v-list-item>
                    <div class="topo-div">
                      <v-btn
                        :color="theme.controller.menu"
                        dark
                        title="Controller"
                        data-cy="fab-controller; margin: 3px"
                        @click="$refs.vis.addController()"
                      >
                        <!--                        <v-icon>$vuetify.icons.net-controller</v-icon>-->
                        <span class="iconfont icon-controller"></span>
                      </v-btn>
                      <p class="ma-0 font-weight-thin text-sm-body-2">控制器</p>
                    </div>
                    <div class="topo-div">
                      <v-btn
                        :color="theme.dummy.menu"
                        dark
                        title="Label"
                        data-cy="fab-dummy"
                        @click="$refs.vis.addDummy()"
                      >
                        <!--                        <v-icon>$vuetify.icons.net-label</v-icon>-->
                        <span class="iconfont icon-dummy"></span>
                      </v-btn>
                      <p class="ma-0 font-weight-thin text-sm-body-2">标签</p>
                    </div>
                  </v-list-item>
                  <v-list-item>
                    <div class="topo-div">
                      <v-btn
                        dark
                        color="red"
                        title="Delete"
                        data-cy="fab-delete"
                        @click="$refs.vis.deleteSelected()"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                      <p class="ma-0 font-weight-thin text-sm-body-2">删除</p>
                    </div>
                  </v-list-item>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header> 提交</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-list-item>
                    <div class="topo-div">
                      <v-btn
                        :disabled="working"
                        color="primary"
                        @click="downloadScript"
                        >提交拓扑图
                      </v-btn>

                    </div>
                    <div class="topo-div">
                      <v-btn
                        :disabled="working"
                        color="primary"
                        @click="mtdOpen"
                      >安全模式启动<br>(打开MTD)
                      </v-btn>

                    </div>
                  </v-list-item>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
        </v-col>
      </v-row>

      <Edit ref="edit" />
    </template>
  </div>
</template>

<script>
import LoadingSpinner from "@/components/LoadingSpinner";
import VisContainer from "@/components/VisContainer";
import Edit from "./components/Edit";
import { items as theme } from "@/utils/theme";
import exporter from "@/utils/exporter";
import Builder from "@/builder";
import { mapGetters } from "vuex";
import Ryu from "./components/Ryu";
import "../../assets/icon/iconfont.css";

// eslint-disable-next-line no-unused-vars
function download(filename, mimeOrHref, data) {
  const href =
    mimeOrHref && data
      ? `data:${mimeOrHref},${encodeURIComponent(data)}`
      : mimeOrHref;

  const element = document.createElement("a");
  element.setAttribute("href", href);
  element.setAttribute("download", filename);
  element.style.display = "none";

  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

export default {
  name: "CanvasPage",
  components: { Edit, LoadingSpinner, VisContainer, Ryu },
  data: () => ({
    showPanel: false,
    fab: false,
    theme,
  }),
  computed: {
    ...mapGetters("topology", ["data"]),
    working: {
      get() {
        return !!this.$store.state.working;
      },
      set(value) {
        if (value === true) {
          this.$store.commit("clearAlert");
        }
        this.$store.commit("setWorking", { working: value });
      },
    },
    loading() {
      return this.$store.state.loading;
    },
    isView() {
      return this.$route.meta.isView;
    },
  },
  methods: {
    showAlert(type, text) {
      this.$store.commit("setAlert", { type, text });
    },
    editItem(item, callback) {
      this.$refs.edit.edit(item, callback);
    },
    getFilename(extension) {
      return `${this.data.projectName || "mininet_network"}.${extension}`;
    },
    downloadScript() {
      this.$emit("log", []);
      const builder = new Builder(exporter.exportData(this.data));
      this.$emit("log", builder.log);
      const script = builder.build();
      // this.showAlert("success", "Script built.");
      this.$axios.defaults.timeout = 100000;
      this.working = true;
      this.$axios.get("http://myc4project:2345/start_ryu");
      // for (var t = Date.now(); Date.now() - t < 5000; );
      this.$axios({
        method: "POST",
        url: "http://myc4project:5566/start_net",
        data: script,
        headers: {
          "Content-Type": "text/plain",
        },
      })
        .then((res) => {
          if (res.status === 200) this.showPanel = !this.showPanel;
          this.showAlert("success", "拓扑构建成功！");
        })
        .catch(() => {
          this.showAlert("error", "拓扑构建失败，请检查容器！");
        })
        .finally(() => {
          this.working = false;
        });
    },
    mtdOpen() {
      this.$emit("log", []);
      const builder = new Builder(exporter.exportData(this.data));
      this.$emit("log", builder.log);
      const script = builder.build();
      // this.showAlert("success", "Script built.");
      this.$axios.defaults.timeout = 100000;
      this.working = true;
      this.$axios.get("http://myc4project:2345/start_mtd");
      // for (var t = Date.now(); Date.now() - t < 5000; );
      this.$axios({
        method: "POST",
        url: "http://myc4project:5566/start_net",
        data: script,
        headers: {
          "Content-Type": "text/plain",
        },
      })
      this.showPanel = !this.showPanel;
      this.working = false;
    }
  },
};
</script>

<style scoped>
.canvas-container {
  width: 100%;
  height: 100%;
  padding: 0px;
}

.invert-color {
  filter: invert(100%);
}

.v-btn--icon,
.v-btn--fab {
  margin: 10px;
}

.topo-div {
  text-align: center;
  width: 50%;
  margin: 3px;
}
</style>
