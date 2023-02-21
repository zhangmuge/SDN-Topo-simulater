#!/usr/bin/env python3
# -*- coding:utf-8 -*-


import time
from scapy.all import *
import ipaddress
import optparse


def scapy_arp_scan(network, ifname):
    net = ipaddress.ip_network(network)
    ip_addr = []
    for ip in net:
        ip = str(ip)
        ip_addr.append(ip)
    time.sleep(1)
    Packet = Ether(dst='FF:FF:FF:FF:FF:FF')/ARP(op=1, hwdst='00:00:00:00:00:00', pdst=ip_addr)
    arp = srp(Packet, iface = ifname, timeout = 1, verbose = False)
    arp_list = arp[0].res
    IP_MAC_LIST = []
    for n in range(len(arp_list)):        
        IP = arp_list[n][1][1].fields['psrc']
        MAC = arp_list[n][1][1].fields['hwsrc']
        IP_MAC = [IP, MAC]
        IP_MAC_LIST.append(IP_MAC)
    return IP_MAC_LIST


if __name__ == '__main__':
    t1 = time.time()
    parser = optparse.OptionParser('use:\n python3 scapy_arp_scan.py --network network --ifnamname')
    parser.add_option('--network', dest = 'network', type = 'string', help = 'network')
    parser.add_option('--ifname', dest = 'ifname', type = 'string', help = 'name')
    (options, args) = parser.parse_args()
    network = options.network
    ifname = options.ifname
    if network == None or ifname == None:
        print(parser.usage)
    else:
        active_ip_mac = scapy_arp_scan(network, ifname)
        for ip, mac in active_ip_mac:
            print(ip, mac)
    t2 = time.time()

