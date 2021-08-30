#!/usr/bin/python3
# cgi code in python

import cgi
import subprocess as sp

commands = {
    "ShAI": "docker images",
    "ShAC": "docker ps",
    "ShAIn": "docker info"
}

print("Content-type: text/html");
print("Access-Control-Allow-Origin: *");
print("\n");

form = cgi.FieldStorage()
cmd = form.getvalue('cmd')
if cmd in commands:
    cmd = commands[cmd]
    cmd = "sudo " + cmd
    try:
        output = sp.getstatusoutput(cmd)
        if output[0] == 0:
            print(output[1])
        else:
            print("Error Processing The Request")
    except:
            print("Error Processing The Request")
else:
    try:
        cmd = "sudo " + cmd
        output = sp.getstatusoutput(cmd)
        if output[0] == 0:
            print(output[1])
        else:
            print("Unknown Command")
    except:
        print("Unknown Command")

