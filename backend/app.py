#!flask/bin/python
from flask import Flask,request, jsonify
import json
from main import find_repetitions_and_exercise
app = Flask(__name__)

@app.route('/')
def index():
	return "Hello, World!"

@app.route("/api/sensor", methods=["POST"])
def json_example():
	req = request.get_json()
	x = req['data']
	print(x)
	if(len(x)):
		json_data = find_repetitions_and_exercise(x)
		print(json_data)
		return json_data

if __name__ == '__main__':
	app.run(debug=True, host='0.0.0.0')