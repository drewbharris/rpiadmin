import os
import psutil
from flask import Flask
from flask import render_template
from flask import request
from flask import jsonify
app = Flask(__name__)


@app.route('/', methods=['GET'])
def index():
    if request.method == 'GET':
        return render_template('index.html')


@app.route('/api/v1/system/statistics', methods=['GET'])
def get_stats():
    if request.method == 'GET':
        data = {
            "cpu_usage": psutil.cpu_percent(),
            "mem_usage": psutil.phymem_usage()[3]
        }
        return jsonify(**data)


@app.route('/api/v1/system/shutdown', methods=['POST'])
def shutdown():
    if request.method == 'POST':
        os.system("sudo shutdown now")
        data = {
            "status": "ok"
        }
        return jsonify(**data)


@app.route('/api/v1/system/reboot', methods=['POST'])
def reboot():
    if request.method == 'POST':
        os.system("sudo reboot")
        data = {
            "status": "ok"
        }
        return jsonify(**data)


if __name__ == '__main__':
    app.run()
