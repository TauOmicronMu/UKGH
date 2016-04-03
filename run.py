from flask import Flask, jsonify
from gitnetwork import follower_graph

app = Flask(__name__)


@app.route("/api/user/<string:username>")
def get_graph(username):
    return jsonify(follower_graph(username)), 200


app.run("localhost", 8080, debug=True)