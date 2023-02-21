import request from "@/utils/request";
import config from "@/config/config";

export function fetchData(query) {
  return request({
    url: "./table.json",
    method: "get",
    params: query,
  });
}

export function changePanel() {
  return request({
    url: config.Mini_URL + "/first_start",
    method: "get",
  });
}
export function watchTopo() {
  return request({
    url: config.Mini_URL + "/defaulttopo",
    method: "get",
  });
}
