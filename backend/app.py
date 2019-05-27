#!flask/bin/python
from flask import Flask, jsonify
import json

app = Flask(__name__)

@app.route('/')
def index():
    return "Hello, World!"

@app.route('/api/sensor/', methods=['POST'])
def get_sensor_data():
	data = json.loads(request.data)
	print(data)
	counts = 1
	return jsonify({'counts' : counts})

if __name__ == '__main__':
    app.run(debug=True)