from bottle import route, run, template, get, post, HTTPResponse, request, response, hook
import os


@route('/start_ryu')
def start_ryu():
    os.system(
        "ryu-manager " + "/ryu/app/" + "gui_topology/gui_topology.py " + "/ryu/app/simple_switch_13.py --observe-links")


@route('/start_mtd')
def start_mtd():
    os.system("ryu-manager " + "/ryu/app/" + "gui_topology/gui_topology.py " + "/ryu/app/mtd.py --observe-links")


if __name__ == '__main__':
    run(host="0.0.0.0", port=2345)
