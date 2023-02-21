import Router from "vue-router";
import Vue from "vue";
import store from "@/store";

import AboutPage from "@/views/About";
import CanvasPage from "@/views/Canvas";
import TopologyToolbar from "@/components/TopologyToolbar";
import ExportPage from "@/views/Export";
import HomePage from "@/views/Home";
import MininetSettingsPage from "@/views/MininetSettings";

Vue.use(Router);

function selectionTitleSuffix(ids) {
  if (!ids) {
    return "";
  }

  const length = ids.split(",").length;
  return ` with ${length} selected item${length === 1 ? "" : "s"}`;
}

function createRoutes(mapper = (v) => v) {
  return [
    {
      path: "/",
      name: "/",
      redirect: { name: "Home" },
    },
    {
      path: "/home",
      name: "Home",
      meta: {
        title: "主页",
        drawer: true,
        icon: "mdi-home",
      },
      component: HomePage,
    },
    {
      path: "/canvas",
      name: "Canvas",
      meta: {
        title: "编辑拓扑图",
        drawer: true,
        icon: "mdi-map",
      },
      components: {
        default: CanvasPage,
        toolbar: TopologyToolbar,
      },
      props: {
        toolbar: {
          undoRedo: true,
        },
      },
      children: [
        {
          path: ":ids?",
          name: "Canvas without position",
          meta: {
            title: "Canvas",
            subtitle(to) {
              return selectionTitleSuffix(to.params.ids);
            },
          },
        },
        {
          path: ":x/:y/:scale/:ids?",
          name: "Canvas with position",
          meta: {
            title: "Canvas",
            subtitle(to) {
              const { x, y, scale, ids } = to.params;
              return ` at position ${x}\u{a0}×\u{a0}${y} scaled to ${(
                scale * 100
              ).toFixed(0)}\u{a0}%${selectionTitleSuffix(ids)}`;
            },
          },
        },
      ],
    },
    {
      path: "/mininet_settings",
      name: "Mininet settings",
      meta: {
        title: "拓扑设置",
        drawer: true,
        icon: "mdi-tune",
      },
      components: {
        default: MininetSettingsPage,
        toolbar: TopologyToolbar,
      },
    },
    {
      path: "/export",
      name: "Export",
      meta: {
        title: "导入/导出拓扑",
        drawer: true,
        icon: "mdi-content-save",
      },
      components: {
        default: ExportPage,
        toolbar: TopologyToolbar,
      },
    },
    {
      path: "/ryu",
      name: "ryu",
      component: () => import("@/views/Canvas/index"),
      children: [
        {
          path: "watchtopo",
          name: "watchtopo",
          component: () => import("@/components/ryu/watchtopo"),
        },
        {
          path: "watchrouter",
          name: "watchrouter",
          component: () => import("@/components/ryu/watchrouter"),
        },
        {
          path: "watchrouter/flow/:id",
          name: "watchflow",
          component: () => import("@/components/ryu/watchflow"),
          props: true,
        },
        {
          path: "add_flow",
          name: "add_flow",
          component: () => import("@/components/ryu/add_flow"),
        },
        {
          path: "add_flow_by_file",
          name: "add_flow_by_file",
          component: () => import("@/components/ryu/add_flow_by_file"),
        },
        {
          path: "delete_flow_by_id",
          name: "delete_flow_by_id",
          component: () => import("@/components/ryu/delete_all_flow_entries"),
        },
        {
          path: "pings",
          name: "pings",
          component: ()=>import("@/components/ryu/pings")
        },
        {
          path: "iperf",
          name: "iperf",
          component:()=>import("@/components/ryu/iperf")
        },
        {
          path: "mtd_ping",
          name: "mtd_ping",
          component: ()=>import("@/components/ryu/mtd_ping")
        }
      ],
    },
    {
      path: "/about",
      name: "About",
      meta: {
        title: "关于",
        drawer: true,
        icon: "mdi-information",
      },
      component: AboutPage,
    },
  ].map(mapper);
}

function createNormalRoute(route) {
  if (route.meta == null) {
    route.meta = {};
  }
  route.meta.isView = false;

  if (route.children != null) {
    route.children = route.children.map(createNormalRoute);
  }

  return route;
}

function createViewRoute(route) {
  route.name = `View | ${route.name}`;

  if (route.path.startsWith("/")) {
    route.path = `/view${route.path}`;
  }

  if (route.meta == null) {
    route.meta = {};
  }
  route.meta.drawer = false;
  route.meta.isView = true;

  if (route.redirect != null) {
    route.redirect.name = `View | ${route.redirect.name}`;
  }

  if (route.children != null) {
    route.children = route.children.map(createViewRoute);
  }

  return route;
}

const routes = [
  ...createRoutes(createNormalRoute),
  ...createRoutes(createViewRoute),
];

export const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  // Stay in view mode
  if (!to.meta.isView && from.meta.isView) {
    return next(`/view${to.fullPath}`);
  }

  // Clear the alert and working state if changing between routes
  // but not if they are child routes with the same parent.
  if (
    to.matched.length === 0 ||
    from.matched.length === 0 ||
    to.matched[0].name !== from.matched[0].name
  ) {
    store.commit("clearAlert");
    store.commit("setWorking", { working: false });
  }

  next();
});

export default router;
