import base64, json
import time


def time_executor(data):
    payload = data['payload']
    loc = data['loc']
    path = data['path']
    print(not data['payload'] and (loc == "now" or loc == ""))
    if not data['payload'] and (loc == "now" or loc == ""):
        return time.time()


class Executor:
    def __init__(self, data):
        self.data = data

    def execute(self):
        result = {}
        match self.data["scheme"]:
            case 'time':
                result = time_executor(self.data)
        return result
