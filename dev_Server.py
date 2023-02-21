import subprocess

from bottle import route, run, template, get, post, HTTPResponse, request, response, hook
from subprocess import check_output, Popen


@hook('after_request')
def enable_cors():
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'


@route('/stats/switches')
def switches():
    # print(sh("curl http://myc4project:8080/stats/switches"))
    return sh("curl http://myc4project:8080/stats/switches")


@route('/stats/flow/<id>')
def flow(id):
    return sh("curl http://myc4project:8080/stats/flow/" + id)


@route('/stats/flowentry/clear/<id>')
def flow_delete(id):
    sh("curl -X DELETE http://myc4project:8080/stats/flowentry/clear/" + id)
    return HTTPResponse(status=200)


@route('/stats/flowentry/add', method="POST")
def add_flow():
    script = request.body.read().decode('UTF-8')
    script = str(script)
    script = script.split('\n')
    sh('curl -X POST -d ' + "'" + script + "'")
    return HTTPResponse(status=200)


def sh(cmd):
    cmd = cmd.split(" ")
    a = Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE).communicate()
    b = "".join(a[0].decode('UTF-8'))
    return b


#
# @route('/start_docker')
# def start_docker():
#     print(sh("docker-compose up"))
#
#
# @route('/stop_docker')
# def stop_docker():
#     sh("docker-compose down")


if __name__ == '__main__':
    run(host="0.0.0.0", port=4455)
