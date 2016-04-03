from functools import wraps


def cache(func):
    """Cache a function where we don't care about keyword args.
    :param func: The function to cache.
    """
    store = {}

    @wraps(func)
    def new(*args, **kwargs):
        # If we don't have the response cached, make the request.
        if args not in store:
            store[args] = func(*args, **kwargs)

        return store[args]

    return new
