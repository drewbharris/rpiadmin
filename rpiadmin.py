import os
import psutil
import time
from flask import Flask
from flask import render_template
from flask import request
from flask import jsonify
app = Flask(__name__)


# Main web application
@app.route('/', methods=['GET'])
def index():
    if request.method == 'GET':
        stats = get_stats()
        return render_template('index.html', stats=stats)


# API routes
@app.route('/api/v1/system/statistics', methods=['GET'])
def api_stats():
    if request.method == 'GET':
        return jsonify(**get_stats())


@app.route('/api/v1/system/shutdown', methods=['POST'])
def api_shutdown():
    if request.method == 'POST':
        if os.environ.get('RPI_ENV') == 'production':
            os.system("sudo shutdown now")
        data = {
            "status": "ok"
        }
        return jsonify(**data)


@app.route('/api/v1/system/reboot', methods=['POST'])
def api_reboot():
    if request.method == 'POST':
        if os.environ.get('RPI_ENV') == 'production':
            os.system("sudo reboot")
        data = {
            "status": "ok"
        }
        return jsonify(**data)


@app.route('/api/v1/launch/xbmc', methods=['POST'])
def api_launch_xbmc():
    if request.method == 'POST':
        if os.environ.get('RPI_ENV') == 'production':
            os.system("pkill emulationstation")
            os.system("xbmc-standalone &")
        data = {
            "status": "ok"
        }
        return jsonify(**data)


@app.route('/api/v1/launch/emulationstation', methods=['POST'])
def api_launch_emulationstation():
    if request.method == 'POST':
        if os.environ.get('RPI_ENV') == 'production':
            os.system("pkill xbmc")
            os.system("emulationstation &")
        data = {
            "status": "ok"
        }
        return jsonify(**data)


def get_stats():
    data = {
        "cpu_usage": psutil.cpu_percent(),
        "mem_usage": psutil.phymem_usage()[3],
        "uptime": time.strftime('%H:%M',
                                time.gmtime(round(time.time() -
                                            psutil.BOOT_TIME)))
    }
    return data

if __name__ == '__main__':
    app.run()
