import os
from flask import Flask
from flask import render_template
app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/v1/system/shutdown')
def shutdown():
    os.system("sudo shutdown now")
    return "ok"


@app.route('/api/v1/system/reboot')
def reboot():
    os.system("sudo reboot")
    return "ok"


if __name__ == '__main__':
    app.run()
