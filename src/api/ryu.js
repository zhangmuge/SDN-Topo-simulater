import request from "@/utils/request";
import config from "@/config/config";

export function submitFlow(flow) {
  return request({
    url: config.Ryu_URL + "/stats/flowentry/add",
    method: "post",
    params: flow,
  });
}

export function getdpid() {
  return request({
    url: config.Ryu_URL + "/stats/switches",
    method: "get",
  });
}

export function deleteflow(id) {
  return request({
    url: config.Ryu_URL + "/stats/flowentry/clear/" + id,
    method: "delete",
  });
}

export function getflow(id) {
  return request({
    url: config.Ryu_URL + "/stats/flow/" + id,
    method: "get",
  });
}
