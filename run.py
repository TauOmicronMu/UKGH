import requests
from flask import Flask, jsonify
from gitnetwork import follower_graph, api_url

app = Flask(__name__)


@app.route("/api/user/<string:username>")
def get_graph(username):
    user = requests.get(api_url("users/" + username)).json()
    user["followers"] = follower_graph(username)
    return jsonify(user), 200


app.run("localhost", 8080, debug=True)