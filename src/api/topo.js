import request from "@/utils/request";
import config from "@/config/config";

export function addHost(hostname, ip, switch_name) {
  return request({
    url:
      config.Mini_URL + "/addhost/" + hostname + "/" + ip + "/" + switch_name,
    method: "get",
  });
}

export function addLink(name1, name2) {
  return request({
    url: config.Mini_URL + "/addlink/" + name1 + "/" + name2,
    method: "get",
  });
}

export function addSwitch(name) {
  return request({
    url: config.Mini_URL + "/addswitch/" + name,
    method: "get",
  });
}
export function delHost(name) {
  return request({
    url: config.Mini_URL + "/deletehost/" + name,
    method: "get",
  });
}

export function delLink(name1, name2) {
  return request({
    url: config.Mini_URL + "/dellink/" + name1 + "/" + name2,
    method: "get",
  });
}

export function delSwitch(name) {
  return request({
    url: config.Mini_URL + "/deleteswitch/" + name,
    method: "get",
  });
}
