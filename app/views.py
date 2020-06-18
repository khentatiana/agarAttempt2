from app import app
from flask import render_template, jsonify, request
import json


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
    info = json.loads(request.data)
    print(info)
    return info
