import requests

requests.get('https://api.github.com')

user = input("Enter your GitHub username: ")


def deprecated(function):
    function.deprecated = True
    return function


# Recursively generate the first n levels of a follower //graph//.
@deprecated
def follower_graph(username, depth):
    user_data = requests.get("https://api.github.com/users/" + username + "/followers").json()
    followers_dict = {}
    for follower in user_data:
        if depth:
            follower_name = follower["login"]
            followers_dict[follower_name] = follower_graph(follower_name, depth - 1)
    return followers_dict