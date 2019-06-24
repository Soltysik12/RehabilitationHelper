#!flask/bin/python
from flask import Flask,request, jsonify
import json
from main import normalize_and_draw
app = Flask(__name__)

@app.route('/')
def index():
    return "Hello, World!"

@app.route("/api/sensor", methods=["POST"])
def json_example():
    req = request.get_json()
    x = req['data']
    normalize_and_draw(x)
    return "Thanks!"

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')