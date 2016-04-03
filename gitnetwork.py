from pprint import pprint
import requests
from utils import cache

from key import API_KEY

AUTH_HEADERS = {'Authorization': 'token %s' % API_KEY}

# Helper function for Github API URLs.
api_url = "https://api.github.com/{}".format

# Manually decorate requests.get with our cache function.
requests.get = cache(requests.get)


def followers_of(username):
    """Generates the followers of a username."""
    request = requests.get(api_url("users/{}/followers".format(username)),
                           headers=AUTH_HEADERS)
    if request.status_code == 404:
        raise ValueError("404! User not found.")
    else:
        followers = request.json()
        yield from followers


def follower_graph(username, depth=2):
    """Generate a graph of followers (of followers, of followers...).
    :param depth: The maximum depth to search for followers in the graph.
    :param username: The username we're starting with for this graph.
    """
    # Check if we've reached the base case.
    if depth <= 0:
        return None

    # Grab the usernames of this username's followers.
    try:
        followers = followers_of(username)
    except ValueError:
        return {}

    # Recursively generate a follower graph for each of our followers.
    graph = {}
    for follower in followers:
        username = follower["login"]
        follower.update({
            "followers": follower_graph(username, depth-1)
        })
        graph[username] = follower
    return graph


def main(username=None):
    if username is None:
        username = input("Enter your GitHub username: ")
    graph = follower_graph(username)
    pprint(graph)


if __name__ == "__main__":
    import sys

    main(*sys.argv[1:])
