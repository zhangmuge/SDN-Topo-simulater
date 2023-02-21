import os
import time
from subprocess import (Popen, PIPE, check_output as co,
                        CalledProcessError)
from mininet.cli import CLI
from mininet.net import Mininet
import mininet.link
import mininet.log
import mininet.node
from bottle import route, run, template, get, post, HTTPResponse, request, response, hook
from socket import IP_MAX_MEMBERSHIPS
from scapy.all import *
import ipaddress
import optparse


@hook('after_request')
def enable_cors():
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'


@route('/hello')
def hello():
    return "Hello"


@route('/start_net', method='POST')
def get_script():
    script = request.body.read().decode('UTF-8')
    script = str(script)
    script = script.split('\n')

    for i in script:
        # print(i)
        exec(i, globals())


@route('/stop_net', methon='GET')
def stop_net():
    net.stop()


@route('/cmd/<cmd>')
def cmd(cmd):
    cli.onecmd(cmd)


def sh(cmd):
    """Print a command and send it to the shell"""
    result = Popen(['/bin/sh', '-c', cmd], stdout=PIPE).communicate()[0]
    # return decode(result)


#
def change(ips):
    ip_line = ips.split(".")
    ip_line[3] = "0"
    net_str = '.'.join([str(s) for s in ip_line])
    net_yan = "/24"
    net_str = ''.join(net_str + net_yan)
    print("net_str:" + net_str)
    return net_str


@route('/mtd_ping/<host1>')
def mtdping(host1):
    host1 = net.get(host1)
    host1_lines = host1.cmd("ifconfig|grep 'inet'").split("\r\n")
    host1_line = host1_lines[0].split("inet")
    h1 = host1_line[1].split(" ")[1]
    print("h1:  " + h1)
    network = change(h1)
    host1_lines = host1.cmd("ifconfig").split(":")
    ifname = host1_lines[0]
    print(network + ifname)
    ip_mac_list = host1.cmd("python3 scan_arp.py --network=" + network + " --ifname=" + ifname).split("\r\n")
    print(ip_mac_list)
    ip_list = []
    for n in ip_mac_list[:-1]:
        print(n)
        ip_list.append(n.split(" ")[0])
    for h2 in ip_list:
        cmd = host1.cmd("ping -c 1 " + h2 + "|grep 'time='")
        lines = cmd.split("\r\n")
        lines.remove('')
        sum = 0
        for line in lines:
            time_ms = line.split("time=")
            time_s = time_ms[1].split(" ")
            time = float(time_s[0])
            sum += time
        print(h2 + "    time:" + str(sum) + "ms")
    res=""
    for i in ip_list:
        res+=i+"<br>"
    return res

@route('/iperf/<h1>/<h2>')
def tipref(h1, h2):
    net.pingAll()
    h1=net.get(h1)
    h2=net.get(h2)
    h2_cmd = h2.cmd("iperf -s &")
    h2_ip = h2.cmd("ifconfig|grep 'inet'")[13:21]
    h1_cmd = h1.cmd("iperf -c " + h2_ip)
    for i in h1_cmd:
        print(i)
    throughput = round(float(result.split(" ")[7]) * 1.0 / 10 * 8, 2)
    unit = result.split(" ")[11]
    print("---------------TCP test---------------")
    print("Throughput" + str(throughput) + unit.split("\r")[0] + "BW:" + result.split(" ")[10] + unit.split("\r")[0])


@route('/pings/<host1>/<host2>')
def pings(host1, host2):
    h1=host1
    h2=host2
    host1 = net.get(host1)
    host2 = net.get(host2)
    host1_lines = host1.cmd("ifconfig|grep 'inet'").split("\r\n")
    host1_line = host1_lines[0].split("inet")
    h1 = host1_line[1].split(" ")[1]
    # h1 = host1.cmd("ifconfig|grep 'inet'")[13:21]
    host2_lines = host2.cmd("ifconfig|grep 'inet'").split("\r\n")
    host2_line = host2_lines[0].split("inet")
    h2 = host2_line[1].split(" ")[1]
    # h2 = host2.cmd("ifconfig|grep 'inet'")[13:21]
    cmd = host1.cmd("ping -c 5 " + h2 + "|grep 'time='")
    lines = cmd.split("\r\n")
    lines.remove('')
    sum = 0
    res = ""
    for line in lines:
        res += line + "<br>"
        time_ms = line.split("time=")
        time_s = time_ms[1].split(" ")
        time = float(time_s[0])
        sum += time
    res += "---&nbsp;"+h1+"&nbsp;ping&nbsp;"+h2+"&nbsp;statistics&nbsp;---<br>5&nbsp;packets&nbsp;transmitted,&nbsp;5&nbsp;received,&nbsp;0%&nbsp;packet&nbsp;loss,&nbsp;time&nbsp;=&nbsp;"+str(sum)+"&nbsp;ms"
    return res


if __name__ == '__main__':
    run(host='0.0.0.0', port=5566)
