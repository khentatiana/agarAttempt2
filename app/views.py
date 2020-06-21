from app import app
from flask import render_template, jsonify, request
import json

global units


class User:
    def __init__(self, information):
        self.loc = [information['x'], information['y']]

    def set_location(self, information):
        self.loc = [information['x'], information['y']]


@app.route('/')
def main_page():
    return render_template('main.html')


@app.route('/animation')
def animation():
    return render_template('music_player.html')


@app.route('/agar')
def index():
    return render_template('index.html')


@app.route('/agar/sendData', methods=['POST'])
def receive():
    global units

    info = json.loads(request.data)
    if info['type'] == 'login':
        # add a user
        # name: [x, y]
        units['name'] = [info['x'], info['y']]
    elif info['type'] == 'logout':
        # delete user
        units.pop(info['name'])
    else:
        # update the user's coordinates
        units['name'] = [info['x'], info['y']]

    # return a list of all the coordinates of other users
    return units
